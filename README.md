# Base Network Developer Portfolio

[![Base Network](https://img.shields.io/badge/Base-Network-blue)](https://base.org)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-green)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-Framework-yellow)](https://hardhat.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This project demonstrates a comprehensive Hardhat use case for deploying and interacting with smart contracts on the Base network (Mainnet and Sepolia testnet).

## 🔗 Developer Identity

**Wallet Address:** `0x2C7808A3162146Cc861866783677B3Da64CFb7A6`

This wallet address links this GitHub repository to on-chain activity on the Base network, establishing a clear developer footprint.

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

## Project Structure

- `contracts/` - Smart contracts
- `scripts/` - Deployment and utility scripts
- `test/` - Test files
- `deployments/` - Deployment artifacts (auto-generated)

## License

MIT

## 📋 Complete Deployment Workflow

Follow this step-by-step guide to establish your Base network developer footprint:

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

## 📊 Deployment Report Template

After completing deployments, document your activity:

### Base Sepolia Testnet
- **Contract Address:** `0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B`
- **Basescan Contract Page:** https://sepolia.basescan.org/address/0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B
- **Verification Status:** ✅ Verified

### Base Mainnet
- **Contract Address:** `0xd37fC2226e6B9A82535174950727f1DED1290E8F`
- **Basescan Contract Page:** https://basescan.org/address/0xd37fC2226e6B9A82535174950727f1DED1290E8F
- **Verification Status:** ✅ Verified

### Developer Interactions
- **Total Transactions:** 10 successful interactions across both networks
- **Transaction Types:** Increment, Decrement, Reset operations
- **All transaction details:** See [DEPLOYMENT_REPORT.md](DEPLOYMENT_REPORT.md)

## 🔗 Links
- **GitHub Repository:** `https://github.com/BaseBlockBuilder/base-developer-portfolio`
- **Developer Wallet:** `0x2C7808A3162146Cc861866783677B3Da64CFb7A6`
- **Base Sepolia Contract:** `https://sepolia.basescan.org/address/0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B`
- **Base Mainnet Contract:** `https://basescan.org/address/0xd37fC2226e6B9A82535174950727f1DED1290E8F`