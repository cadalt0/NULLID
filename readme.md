# NullID

## What is NullID?

NullID is a privacy-first identity verification system for Telegram that helps stop impersonation scams. It allows users to verify their work email on Telegram using zero-knowledge proofs, meaning you can prove who you are without exposing any personal data.

## Key Features

- **Privacy-Preserving Verification**: Verify your identity without sharing or storing any personal data
- **Zero-Knowledge Proofs**: Prove who you are without revealing sensitive information
- **Work Email Verification**: Securely verify your professional identity
- **Anti-Scam Protection**: Help prevent Telegram impersonation scams
- **Instant Verification**: Quick and easy verification process
- **No Data Storage**: Your personal information stays private and is never stored

## How It Works

1. Connect your work email to your Telegram account
2. NullID verifies your identity using zero-knowledge proofs
3. Get a verified badge on Telegram
4. Others can instantly verify your identity without exposing any personal data

## Benefits

- **Stay Safe**: Protect yourself and others from impersonation scams
- **Maintain Privacy**: Keep your personal information private
- **Build Trust**: Show others you're who you say you are
- **Professional Verification**: Prove your professional identity securely

## Use Cases

- Verify your identity in professional Telegram groups
- Prevent impersonation in crypto and business communities
- Build trust in professional networks
- Protect against identity theft and scams 


TEST PROOF GENERATION AND POSTING RAW DATA 
``` Generating zk proof...
zk Proof: {
  "claimData": {
    "provider": "http",
    "parameters": "{\"body\":\"\",\"headers\":{\"User-Agent\":\"reclaim/0.0.1\",\"accept\":\"application/json\"},\"method\":\"GET\",\"responseMatches\":[{\"type\":\"regex\",\"value\":\"(?<user_id>\\\"user_id\\\":\\\"111222\\\").*?(?<company_name>\\\"company_name\\\":\\\"([^\\\"]+)\\\")\"}],\"responseRedactions\":[],\"url\":\"https://nullidserver-5f21296b77d5.herokuapp.com/api/users/111222\"}",
    "owner": "0x35e043b19f8401435b73f625825fd7ff03134009",
    "timestampS": 1749305813,
    "context": "{\"extractedParameters\":{\"company_name\":\"\\\"company_name\\\":\\\"happyhour\\\"\",\"user_id\":\"\\\"user_id\\\":\\\"111222\\\"\"},\"providerHash\":\"0xff9d762b136b661ade18eb5dbdf50229a8c49477280ce9289fa223ce7c346b36\"}",
    "identifier": "0xccc8c70d640b9bd025e33369057ab4ca56197e30cae0064abb6d4f236de45370",
    "epoch": 1
  },
  "identifier": "0xccc8c70d640b9bd025e33369057ab4ca56197e30cae0064abb6d4f236de45370",   
  "signatures": [
    "0xbc414dacb953c483fdc9721d9d1b79b64b3aef94ceeb935e6cbb69e2dc153e115d6931bf0f2e15f2907844a9d9603eada262ab3d69d36f28da4b899dbe6073591b"
  ],
  "extractedParameterValues": {
    "company_name": "\"company_name\":\"happyhour\"",
    "user_id": "\"user_id\":\"111222\""
  },
  "witnesses": [
    {
      "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
      "url": "wss://attestor.reclaimprotocol.org:447/ws"
    }
  ]
}
Submitting minimal proof to contract...
Proof submitted! Tx hash: 0xa0a377dd7e9f3cf0f0aa8a8f98f5d6efaae88b54b1239563bf9037be23eb87bb
Stored proof for 111222 : {"user_id":"user_id\":\"111222","company_name":"company_name\":\"happyhour","timestamp":1749305813,"witness":{"id":"0x244897572368eadf65bfbc5aec98d8e5443a9072","url":"wss://attestor.reclaimprotocol.org:447/ws"}}
Timestamp: 2025-06-07T14:17:12.000Z

















```
