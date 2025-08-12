const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("=== Counter Contract Interaction Script ===");
  
  // Read the deployed contract address
  const contractsDir = path.join(__dirname, "..", "deployments");
  const addressFile = path.join(contractsDir, "counter-address.json");
  
  if (!fs.existsSync(addressFile)) {
    console.error("Contract address file not found. Please deploy the contract first.");
    process.exit(1);
  }
  
  const counterAddress = JSON.parse(fs.readFileSync(addressFile, "utf8")).Counter;
  console.log(`Interacting with Counter contract at: ${counterAddress}`);
  console.log(`Network: ${hre.network.name}`);
  
  // Get contract instance
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.attach(counterAddress);
  
  // Get current signer
  const [signer] = await hre.ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  
  try {
    // Read current state
    console.log("\n--- Reading Current State ---");
    const currentCount = await counter.getCount();
    const owner = await counter.owner();
    console.log(`Current count: ${currentCount}`);
    console.log(`Contract owner: ${owner}`);
    
    // Perform increment operations
    console.log("\n--- Performing Increment Operations ---");
    for (let i = 1; i <= 3; i++) {
      console.log(`Increment ${i}...`);
      const tx = await counter.increment();
      const receipt = await tx.wait();
      console.log(`  Transaction hash: ${tx.hash}`);
      console.log(`  Gas used: ${receipt.gasUsed.toString()}`);
      
      const newCount = await counter.getCount();
      console.log(`  New count: ${newCount}`);
      
      // Small delay to avoid nonce issues
      if (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Perform decrement operation
    console.log("\n--- Performing Decrement Operation ---");
    const decrementTx = await counter.decrement();
    const decrementReceipt = await decrementTx.wait();
    console.log(`Transaction hash: ${decrementTx.hash}`);
    console.log(`Gas used: ${decrementReceipt.gasUsed.toString()}`);
    
    const countAfterDecrement = await counter.getCount();
    console.log(`Count after decrement: ${countAfterDecrement}`);
    
    // Check if we're the owner and reset if so
    if (signer.address.toLowerCase() === owner.toLowerCase()) {
      console.log("\n--- Performing Reset Operation (Owner Only) ---");
      const resetTx = await counter.reset();
      const resetReceipt = await resetTx.wait();
      console.log(`Transaction hash: ${resetTx.hash}`);
      console.log(`Gas used: ${resetReceipt.gasUsed.toString()}`);
      
      const finalCount = await counter.getCount();
      console.log(`Final count after reset: ${finalCount}`);
    } else {
      console.log("\n--- Skipping Reset (Not Owner) ---");
    }
    
    console.log("\n=== Interaction Complete ===");
    
  } catch (error) {
    console.error("Error during interaction:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });