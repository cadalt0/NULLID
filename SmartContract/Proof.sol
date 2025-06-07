// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleProofRegistry {
    address public constant allowedSubmitter = 0xd5A3259cc15C588EdAF23FaFB9620910580189f4;

    struct Proof {
        string userId;
        string proofJson; // Store the full proof as a JSON string
        uint256 timestamp;
    }

    mapping(string => Proof) private proofs;

    event ProofSubmitted(string indexed userId, string proofJson, uint256 timestamp);

    modifier onlySubmitter() {
        require(msg.sender == allowedSubmitter, "Not authorized to submit proof");
        _;
    }

    // Submit a proof for a user_id
    function submitProof(string memory userId, string memory proofJson) public onlySubmitter {
        proofs[userId] = Proof({
            userId: userId,
            proofJson: proofJson,
            timestamp: block.timestamp
        });
        emit ProofSubmitted(userId, proofJson, block.timestamp);
    }

    // Get proof by user_id
    function getProof(string memory userId) public view returns (string memory, uint256) {
        Proof memory p = proofs[userId];
        require(bytes(p.userId).length > 0, "Proof not found");
        return (p.proofJson, p.timestamp);
    }
}
