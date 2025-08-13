const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying SimpleStorage contract...");

  // Deploy SimpleStorage contract
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  
  await simpleStorage.waitForDeployment();
  const storageAddress = await simpleStorage.getAddress();
  
  console.log(`SimpleStorage deployed to: ${storageAddress}`);
  console.log(`Network: ${hre.network.name}`);
  
  // Save the contract address to a file for later use
  const contractsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  
  // Read existing addresses or create new object
  const addressFile = path.join(contractsDir, "contract-addresses.json");
  let addresses = {};
  if (fs.existsSync(addressFile)) {
    addresses = JSON.parse(fs.readFileSync(addressFile, "utf8"));
  }
  
  // Add SimpleStorage address for this network
  if (!addresses[hre.network.name]) {
    addresses[hre.network.name] = {};
  }
  addresses[hre.network.name].SimpleStorage = storageAddress;
  
  fs.writeFileSync(
    addressFile,
    JSON.stringify(addresses, null, 2)
  );
  
  console.log(`Contract address saved to deployments/contract-addresses.json`);
  
  // Return the contract address for potential verification
  return storageAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });