import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import useOtpStore from '../../services/otpService';
import { ethers } from 'ethers';

// Contract configuration
const CONTRACT_ADDRESS = "0x8aeb43189bd1d8e4bbd8e2496a523ff68d890d08";
const CONTRACT_ABI = [
  "function submitProof(string userId, string proofJson) public",
  "function getProof(string userId) public view returns (string, uint256)"
];
const RPC_URL = "https://testnet-passet-hub-eth-rpc.polkadot.io";

interface OtpStepProps {
  email: string;
  onSubmit: () => void;
}

const OtpStep: React.FC<OtpStepProps> = ({ email, onSubmit }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [proofStatus, setProofStatus] = useState<'idle' | 'generating' | 'submitting' | 'success' | 'error'>('idle');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyOtp = useOtpStore(state => state.verifyOtp);
  
  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  const handleChange = (value: string, index: number) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    
    // Clear error if any
    if (error) setError('');
    
    // Move to next input if current input is filled
    if (value && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    
    // Check if pasted data is a 6-digit number
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      
      // Focus last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };
  
  const generateAndSubmitProof = async (userId: string, companyName: string) => {
    try {
      setProofStatus('generating');
      
      // Create minimal proof data
      const timestamp = Math.floor(Date.now() / 1000);
      const minimalProof = {
        user_id: userId,
        company_name: companyName,
        timestamp,
        witness: {
          id: "telegram_verification",
          url: window.location.origin
        }
      };

      const proofJson = JSON.stringify(minimalProof);

      // Submit proof to contract
      setProofStatus('submitting');
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY || '', provider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

      const tx = await contract.submitProof(userId, proofJson);
      await tx.wait();
      
      setProofStatus('success');
      return true;
    } catch (err) {
      console.error('Error in proof generation/submission:', err);
      setProofStatus('error');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if OTP is complete
    if (otp.some(digit => !digit)) {
      setError('Please enter all 6 digits');
      return;
    }
    
    // Verify OTP
    setIsLoading(true);
    setError('');
    
    const otpString = otp.join('');
    const isValid = verifyOtp(email, otpString);
    
    if (isValid) {
      try {
        // Extract company name from email domain (capitalize first part)
        const emailDomain = email.split('@')[1];
        const companyName = emailDomain ? emailDomain.split('.')[0].charAt(0).toUpperCase() + emailDomain.split('.')[0].slice(1) : 'Unknown';
        
        // Get Telegram user ID (real or mock for testing)
        const telegramId =
          window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'test_user_id';
        
        if (!telegramId) {
          setError('Telegram user ID not found');
          setIsLoading(false);
          return;
        }

        // Use a valid image URL for testing
        const imageUrl = 'https://example.com/test-image.jpg';

        // Push data to database with correct format
        const userData = {
          user_id: String(telegramId), // Ensure user_id is a string
          company_name: companyName,
          image_url: imageUrl
        };

        console.log('Sending user data:', userData);

        const response = await fetch('https://nullidserver-5f21296b77d5.herokuapp.com/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Server error:', errorData);
          throw new Error(errorData?.message || 'Failed to save verification data');
        }

        // Generate and submit proof
        const proofSuccess = await generateAndSubmitProof(String(telegramId), companyName);
        
        if (proofSuccess) {
          onSubmit();
        } else {
          setError('User created but proof submission failed. Please try again.');
        }
      } catch (err) {
        setError('An error occurred during verification. Please try again.');
      }
    } else {
      setError('Invalid or expired OTP. Please try again.');
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          We've sent a verification code to
        </p>
        <p className="font-medium text-gray-800 dark:text-gray-200">
          {email}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Verification Code
          </label>
          
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-12 text-center text-lg font-semibold rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-colors"
              />
            ))}
          </div>
          
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}

          {proofStatus !== 'idle' && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {proofStatus === 'generating' && 'Generating proof...'}
              {proofStatus === 'submitting' && 'Submitting proof to blockchain...'}
              {proofStatus === 'success' && '✓ Proof submitted successfully'}
              {proofStatus === 'error' && '⚠ Proof submission failed'}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || otp.some(digit => !digit)}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-2.5 px-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Verify Code</span>
            </>
          )}
        </button>
        
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          Didn't receive the code? <button type="button" className="text-primary dark:text-primary-light hover:underline">Resend</button>
        </p>
      </form>
    </div>
  );
};

export default OtpStep;