import { zkFetch } from '@reclaimprotocol/sdk';
import { ApiPromise, WsProvider } from '@polkadot/api';

interface ZkProofResult {
  success: boolean;
  proof?: any;
  error?: string;
}

export const generateZkProof = async (email: string, otp: string): Promise<ZkProofResult> => {
  try {
    // Create a zkFetch instance with both App ID and Secret Key
    const zk = new zkFetch({
      appId: process.env.REACT_APP_RECLAIM_APP_ID || '',
      secretKey: process.env.REACT_APP_RECLAIM_SECRET_KEY || '',
    });

    // Create a proof of the OTP verification
    const proof = await zk.createProof({
      // We're creating a proof of our local verification
      url: window.location.origin,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
        timestamp: Date.now(),
        // Add any additional verification data you want to prove
        verificationType: 'email_otp',
        verificationStatus: 'verified'
      }),
    });

    return {
      success: true,
      proof,
    };
  } catch (error) {
    console.error('Error generating zk proof:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate zk proof',
    };
  }
};

export const submitProofToPolkadot = async (proof: any): Promise<boolean> => {
  try {
    // Connect to Polkadot network
    const wsProvider = new WsProvider('wss://your-polkadot-node-url');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Convert proof to the format expected by the Reclaim pallet
    const claimInfo = {
      provider: proof.claimData.provider,
      parameters: proof.claimData.parameters,
      owner: proof.claimData.owner,
      timestampS: proof.claimData.timestampS,
      context: proof.claimData.context,
      identifier: proof.claimData.identifier,
      epoch: proof.claimData.epoch
    };

    const signedClaim = {
      signatures: proof.signatures,
      witnesses: proof.witnesses
    };

    // Submit the proof to the Reclaim pallet
    const tx = api.tx.reclaim.verifyProof(claimInfo, signedClaim);
    
    // Sign and submit the transaction
    const { web3FromAddress } = await import('@polkadot/extension-dapp');
    const injector = await web3FromAddress(proof.claimData.owner);
    
    const signer = injector.signer;
    const unsub = await tx.signAndSend(proof.claimData.owner, { signer }, ({ status }) => {
      if (status.isInBlock) {
        console.log(`Transaction included at blockHash ${status.asInBlock}`);
        unsub();
      }
    });

    return true;
  } catch (error) {
    console.error('Error submitting proof to Polkadot:', error);
    return false;
  }
};

export const verifyZkProof = async (proof: any): Promise<boolean> => {
  try {
    const zk = new zkFetch({
      appId: process.env.REACT_APP_RECLAIM_APP_ID || '',
      secretKey: process.env.REACT_APP_RECLAIM_SECRET_KEY || '',
    });

    // Verify the proof
    const isValid = await zk.verifyProof(proof);
    return isValid;
  } catch (error) {
    console.error('Error verifying zk proof:', error);
    return false;
  }
}; 