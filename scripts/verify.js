const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("Verifying Counter contract...");
  
  // Read the deployed contract address
  const contractsDir = path.join(__dirname, "..", "deployments");
  const counterAddress = JSON.parse(
    fs.readFileSync(path.join(contractsDir, "counter-address.json"), "utf8")
  ).Counter;

  console.log(`Verifying contract at ${counterAddress}...`);
  
  try {
    // Run the verification
    await hre.run("verify:verify", {
      address: counterAddress,
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified!");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
