# Base Network Developer Portfolio

[![Base Network](https://img.shields.io/badge/Base-Network-blue)](https://base.org)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-green)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-Framework-yellow)](https://hardhat.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Smart contracts built for Base network. Includes a Counter and SimpleStorage contract with Hardhat setup, tests, and deployment scripts.

## 🔗 Developer Identity

**Wallet Address:** `0x2C7808A3162146Cc861866783677B3Da64CFb7A6`

This wallet was used to deploy and interact with the contracts on Base network.

## Prerequisites

- Node.js (v16+)
- npm or yarn
- A wallet with test ETH on Base Sepolia (for testnet deployment)
- A wallet with ETH on Base Mainnet (for mainnet deployment)
- [Etherscan API key](https://basescan.org/myapikey) for contract verification

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd base-dev-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your private key and API keys.

## Configuration

The project is pre-configured for both Base Mainnet and Sepolia testnet. You can modify the networks in `hardhat.config.js` if needed.

## Testing

Run the test suite:
```bash
npx hardhat test
```

## Deployment

### Deploy to Base Sepolia (Testnet)
```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

### Deploy to Base Mainnet
```bash
npx hardhat run scripts/deploy.js --network baseMainnet
```

## Verify Contract

After deployment, verify your contract on Basescan:

```bash
npx hardhat run scripts/verify.js --network <network-name>
```

Replace `<network-name>` with either `baseSepolia` or `baseMainnet`.

## Interacting with the Contract

### Automated Interaction Script
Run comprehensive interactions with the deployed contract:

```bash
npx hardhat run scripts/interact.js --network <network-name>
```

### Event Monitoring
Monitor contract events in real-time:

```bash
npx hardhat run scripts/monitor-events.js --network <network-name>
```

### Manual Console Interaction
You can also interact manually using the Hardhat console:

```bash
npx hardhat console --network <network-name>
```

Example usage in the console:
```javascript
const Counter = await ethers.getContractFactory("Counter");
const counter = await Counter.attach("<deployed-contract-address>");

// Get current count
await counter.getCount();

// Increment counter
await counter.increment();

// Decrement counter
await counter.decrement();

// Reset counter (only owner)
await counter.reset();
```

## 🏗️ Smart Contracts

### Counter Contract
Basic counter with increment/decrement and owner-only reset. Includes events for tracking changes.

### SimpleStorage Contract
Stores different data types (numbers, strings, booleans) with user-specific mappings and owner controls.

## Project Structure

- `contracts/` - Smart contracts (Counter.sol, SimpleStorage.sol)
- `scripts/` - Deployment and utility scripts
- `test/` - Comprehensive test files
- `deployments/` - Contract addresses and deployment artifacts

## License

MIT

## 📋 Deployment Guide

Steps to deploy and test the contracts:

### Step 1: Environment Setup
```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your private key and API keys
```

### Step 2: Test Locally
```bash
# Run tests to ensure everything works
npx hardhat test

# Compile contracts
npx hardhat compile
```

### Step 3: Deploy to Base Sepolia (Testnet)
```bash
# Deploy contract
npx hardhat run scripts/deploy.js --network baseSepolia

# Verify contract on Basescan
npx hardhat run scripts/verify.js --network baseSepolia

# Perform developer interactions
npx hardhat run scripts/interact.js --network baseSepolia
```

### Step 4: Deploy to Base Mainnet
```bash
# Deploy contract
npx hardhat run scripts/deploy.js --network baseMainnet

# Verify contract on Basescan
npx hardhat run scripts/verify.js --network baseMainnet

# Perform developer interactions
npx hardhat run scripts/interact.js --network baseMainnet
```

### Step 5: Monitor Activity
```bash
# Monitor events in real-time
npx hardhat run scripts/monitor-events.js --network <network-name>
```

## 📊 Live Deployments

### Counter Contract - Base Sepolia
- **Contract Address:** `0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B`
- **Basescan:** https://sepolia.basescan.org/address/0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B
- **Status:** ✅ Verified & Active

### SimpleStorage Contract - Base Sepolia  
- **Contract Address:** `0x1516EE7E3c0bca2f2c3952d6173269da7fe40f2D`
- **Basescan:** https://sepolia.basescan.org/address/0x1516EE7E3c0bca2f2c3952d6173269da7fe40f2D
- **Status:** ✅ Deployed & Active

### Developer Activity
- **Total Transactions:** 15+ successful interactions
- **Contract Types:** Counter, Data Storage, User Mapping
- **Operations:** Increment/Decrement, Data Storage, Reset Functions
- **Comprehensive Details:** See [DEPLOYMENT_REPORT.md](DEPLOYMENT_REPORT.md)

## 🔗 Links
- **GitHub Repository:** `https://github.com/BaseBlockBuilder/base-developer-portfolio`
- **Developer Wallet:** `0x2C7808A3162146Cc861866783677B3Da64CFb7A6`
- **Base Sepolia Contract:** `https://sepolia.basescan.org/address/0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B`
- **Base Mainnet Contract:** `https://basescan.org/address/0xd37fC2226e6B9A82535174950727f1DED1290E8F`