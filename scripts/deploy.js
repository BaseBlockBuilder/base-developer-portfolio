const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying Counter contract...");

  // Deploy Counter contract
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  
  await counter.waitForDeployment();
  const counterAddress = await counter.getAddress();
  
  console.log(`Counter deployed to: ${counterAddress}`);
  
  // Save the contract address to a file for later use
  const contractsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(contractsDir, "counter-address.json"),
    JSON.stringify({ Counter: counterAddress }, null, 2)
  );
  
  // Return the contract address for potential verification
  return counterAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
