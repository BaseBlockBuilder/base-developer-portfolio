const hre = require("hardhat");

async function main() {
  console.log("Verifying contracts...");

  // Define contract addresses for each network
  const contractAddresses = {
    Counter: {
      baseSepolia: "0xA2AbF65ee8234BfbfF92Eb8B48EB22D9B278D51B",
      baseMainnet: "0xd37fC2226e6B9A82535174950727f1DED1290E8F"
    },
    SimpleStorage: {
      baseSepolia: "0x1516EE7E3c0bca2f2c3952d6173269da7fe40f2D",
      baseMainnet: null // To be deployed when mainnet has funds
    }
  };

  const networkName = hre.network.name;
  
  // Verify all contracts for this network
  for (const [contractName, addresses] of Object.entries(contractAddresses)) {
    const contractAddress = addresses[networkName];
    
    if (!contractAddress) {
      console.log(`⏭️  Skipping ${contractName} - not deployed on ${networkName}`);
      continue;
    }

    console.log(`\n🔍 Verifying ${contractName} at ${contractAddress} on ${networkName}...`);

    try {
      // Run the verification
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log(`✅ ${contractName} verified successfully!`);
    } catch (error) {
      if (error.message.toLowerCase().includes("already verified")) {
        console.log(`✅ ${contractName} is already verified!`);
      } else {
        console.error(`❌ ${contractName} verification failed:`, error.message);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
