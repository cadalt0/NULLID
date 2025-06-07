// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@reclaimprotocol/verifier-solidity-sdk/contracts/Reclaim.sol";
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Addresses.sol";

contract ReclaimVerifier {
    address public reclaimAddress;
    mapping(address => bool) public verifiedUsers;
    
    event ProofVerified(address indexed user, string provider, string context);
    
    constructor() {
        // AssetHub testnet address for Reclaim Protocol
        reclaimAddress = 0x0000000000000000000000000000000000000000; // Replace with actual address
    }
    
    function verifyProof(Reclaim.Proof memory proof) public {
        // Verify the proof using Reclaim Protocol
        Reclaim(reclaimAddress).verifyProof(proof);
        
        // Extract user address from context
        string memory userAddress = extractFieldFromContext(proof.claimInfo.context, '"contextAddress":"');
        
        // Mark user as verified
        address user = stringToAddress(userAddress);
        verifiedUsers[user] = true;
        
        emit ProofVerified(user, proof.claimInfo.provider, proof.claimInfo.context);
    }
    
    function isVerified(address user) public view returns (bool) {
        return verifiedUsers[user];
    }
    
    // Utility function to extract fields from context
    function extractFieldFromContext(string memory data, string memory target)
        public pure returns (string memory)
    {
        bytes memory dataBytes = bytes(data);
        bytes memory targetBytes = bytes(target);
        
        uint256 start = findString(dataBytes, targetBytes);
        if (start == type(uint256).max) return "";
        
        start += targetBytes.length;
        uint256 end = start;
        
        while (end < dataBytes.length && dataBytes[end] != '"') {
            end++;
        }
        
        bytes memory result = new bytes(end - start);
        for (uint256 i = 0; i < result.length; i++) {
            result[i] = dataBytes[start + i];
        }
        
        return string(result);
    }
    
    // Helper function to find a string within bytes
    function findString(bytes memory data, bytes memory target) internal pure returns (uint256) {
        for (uint256 i = 0; i <= data.length - target.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < target.length; j++) {
                if (data[i + j] != target[j]) {
                    found = false;
                    break;
                }
            }
            if (found) return i;
        }
        return type(uint256).max;
    }
    
    // Helper function to convert string to address
    function stringToAddress(string memory _address) internal pure returns (address) {
        bytes memory stringBytes = bytes(_address);
        bytes memory addressBytes = new bytes(20);
        
        for (uint256 i = 0; i < 20 && i < stringBytes.length; i++) {
            addressBytes[i] = stringBytes[i];
        }
        
        return address(uint160(uint256(bytes32(addressBytes))));
    }
} 