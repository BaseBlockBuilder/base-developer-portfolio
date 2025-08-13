const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("=== SimpleStorage Contract Interaction Script ===");
  
  // Read the deployed contract addresses
  const contractsDir = path.join(__dirname, "..", "deployments");
  const addressFile = path.join(contractsDir, "contract-addresses.json");
  
  if (!fs.existsSync(addressFile)) {
    console.error("Contract addresses file not found. Please deploy the contract first.");
    process.exit(1);
  }
  
  const addresses = JSON.parse(fs.readFileSync(addressFile, "utf8"));
  const networkName = hre.network.name;
  
  if (!addresses[networkName] || !addresses[networkName].SimpleStorage) {
    console.error(`SimpleStorage contract address not found for network: ${networkName}`);
    process.exit(1);
  }
  
  const storageAddress = addresses[networkName].SimpleStorage;
  console.log(`Interacting with SimpleStorage contract at: ${storageAddress}`);
  console.log(`Network: ${networkName}`);
  
  // Get contract instance
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.attach(storageAddress);
  
  // Get current signer
  const [signer] = await hre.ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  
  try {
    // Read initial state
    console.log("\n--- Reading Initial State ---");
    const initialNumber = await simpleStorage.getStoredNumber();
    const initialString = await simpleStorage.getStoredString();
    const initialBool = await simpleStorage.getStoredBool();
    const owner = await simpleStorage.owner();
    
    console.log(`Initial number: ${initialNumber}`);
    console.log(`Initial string: "${initialString}"`);
    console.log(`Initial boolean: ${initialBool}`);
    console.log(`Contract owner: ${owner}`);
    
    // Store a number
    console.log("\n--- Storing Number ---");
    const numberToStore = Math.floor(Math.random() * 1000) + 1;
    console.log(`Storing number: ${numberToStore}`);
    const numberTx = await simpleStorage.storeNumber(numberToStore);
    const numberReceipt = await numberTx.wait();
    console.log(`Transaction hash: ${numberTx.hash}`);
    console.log(`Gas used: ${numberReceipt.gasUsed.toString()}`);
    
    const newNumber = await simpleStorage.getStoredNumber();
    console.log(`New stored number: ${newNumber}`);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store a string
    console.log("\n--- Storing String ---");
    const stringToStore = `Base Network Rocks! ${Date.now()}`;
    console.log(`Storing string: "${stringToStore}"`);
    const stringTx = await simpleStorage.storeString(stringToStore);
    const stringReceipt = await stringTx.wait();
    console.log(`Transaction hash: ${stringTx.hash}`);
    console.log(`Gas used: ${stringReceipt.gasUsed.toString()}`);
    
    const newString = await simpleStorage.getStoredString();
    console.log(`New stored string: "${newString}"`);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store a boolean
    console.log("\n--- Storing Boolean ---");
    const boolToStore = !initialBool;
    console.log(`Storing boolean: ${boolToStore}`);
    const boolTx = await simpleStorage.storeBool(boolToStore);
    const boolReceipt = await boolTx.wait();
    console.log(`Transaction hash: ${boolTx.hash}`);
    console.log(`Gas used: ${boolReceipt.gasUsed.toString()}`);
    
    const newBool = await simpleStorage.getStoredBool();
    console.log(`New stored boolean: ${newBool}`);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store user data
    console.log("\n--- Storing User Data ---");
    const userNumber = Math.floor(Math.random() * 500) + 500;
    const userString = `User data from ${signer.address.slice(0, 8)}...`;
    console.log(`Storing user data - Number: ${userNumber}, String: "${userString}"`);
    const userDataTx = await simpleStorage.storeUserData(userNumber, userString);
    const userDataReceipt = await userDataTx.wait();
    console.log(`Transaction hash: ${userDataTx.hash}`);
    console.log(`Gas used: ${userDataReceipt.gasUsed.toString()}`);
    
    const [storedUserNumber, storedUserString] = await simpleStorage.getUserData(signer.address);
    console.log(`Stored user number: ${storedUserNumber}`);
    console.log(`Stored user string: "${storedUserString}"`);
    
    // Reset if owner
    if (signer.address.toLowerCase() === owner.toLowerCase()) {
      console.log("\n--- Performing Reset Operation (Owner Only) ---");
      await new Promise(resolve => setTimeout(resolve, 2000));
      const resetTx = await simpleStorage.resetAll();
      const resetReceipt = await resetTx.wait();
      console.log(`Transaction hash: ${resetTx.hash}`);
      console.log(`Gas used: ${resetReceipt.gasUsed.toString()}`);
      
      const finalNumber = await simpleStorage.getStoredNumber();
      const finalString = await simpleStorage.getStoredString();
      const finalBool = await simpleStorage.getStoredBool();
      console.log(`After reset - Number: ${finalNumber}, String: "${finalString}", Bool: ${finalBool}`);
    } else {
      console.log("\n--- Skipping Reset (Not Owner) ---");
    }
    
    console.log("\n=== SimpleStorage Interaction Complete ===");
    
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