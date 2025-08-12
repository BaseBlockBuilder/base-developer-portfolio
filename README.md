# Base Network Developer Portfolio

This project demonstrates a basic Hardhat use case for deploying and interacting with smart contracts on the Base network (Mainnet and Sepolia testnet).

## Prerequisites

- Node.js (v16+)
- npm or yarn
- A wallet with test ETH on Base Sepolia (for testnet deployment)
- A wallet with ETH on Base Mainnet (for mainnet deployment)
- [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) account (recommended)
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

You can interact with the deployed contract using the Hardhat console:

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
