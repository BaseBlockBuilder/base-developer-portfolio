const hre = require("hardhat");

async function main() {
  console.log("Verifying Counter contract...");

  // Define contract addresses for each network
  const contractAddresses = {
    baseSepolia: "0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B",
    baseMainnet: "0xd37fC2226e6B9A82535174950727f1DED1290E8F"
  };

  const networkName = hre.network.name;
  const counterAddress = contractAddresses[networkName];

  if (!counterAddress) {
    console.error(`No contract address found for network: ${networkName}`);
    process.exit(1);
  }

  console.log(`Verifying contract at ${counterAddress} on ${networkName}...`);

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
