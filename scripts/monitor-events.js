const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("=== Counter Contract Event Monitor ===");
  
  // Read the deployed contract address
  const contractsDir = path.join(__dirname, "..", "deployments");
  const addressFile = path.join(contractsDir, "counter-address.json");
  
  if (!fs.existsSync(addressFile)) {
    console.error("Contract address file not found. Please deploy the contract first.");
    process.exit(1);
  }
  
  const counterAddress = JSON.parse(fs.readFileSync(addressFile, "utf8")).Counter;
  console.log(`Monitoring events for Counter contract at: ${counterAddress}`);
  console.log(`Network: ${hre.network.name}`);
  
  // Get contract instance
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.attach(counterAddress);
  
  try {
    // Get all past CountUpdated events
    console.log("\n--- Fetching Past Events ---");
    const filter = counter.filters.CountUpdated();
    const events = await counter.queryFilter(filter);
    
    if (events.length === 0) {
      console.log("No events found. Try running the interact script first.");
    } else {
      console.log(`Found ${events.length} CountUpdated events:`);
      
      for (const event of events) {
        const { newCount, operation } = event.args;
        const block = await event.getBlock();
        
        console.log(`\n  Event Details:`);
        console.log(`    Block: ${event.blockNumber}`);
        console.log(`    Transaction: ${event.transactionHash}`);
        console.log(`    Timestamp: ${new Date(block.timestamp * 1000).toISOString()}`);
        console.log(`    Operation: ${operation}`);
        console.log(`    New Count: ${newCount.toString()}`);
      }
    }
    
    // Set up real-time event listener
    console.log("\n--- Setting up Real-time Event Listener ---");
    console.log("Listening for new CountUpdated events... (Press Ctrl+C to stop)");
    
    counter.on("CountUpdated", (newCount, operation, event) => {
      console.log(`\n🔔 New Event Detected!`);
      console.log(`  Operation: ${operation}`);
      console.log(`  New Count: ${newCount.toString()}`);
      console.log(`  Transaction: ${event.transactionHash}`);
      console.log(`  Block: ${event.blockNumber}`);
    });
    
    // Keep the script running
    process.stdin.resume();
    
  } catch (error) {
    console.error("Error monitoring events:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});