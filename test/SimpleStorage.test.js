const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new SimpleStorage contract before each test
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await simpleStorage.owner()).to.equal(owner.address);
    });

    it("Should initialize with default values", async function () {
      expect(await simpleStorage.getStoredNumber()).to.equal(0);
      expect(await simpleStorage.getStoredString()).to.equal("Hello Base!");
      expect(await simpleStorage.getStoredBool()).to.equal(true);
    });
  });

  describe("Number Storage", function () {
    it("Should store a number", async function () {
      await simpleStorage.storeNumber(42);
      expect(await simpleStorage.getStoredNumber()).to.equal(42);
    });

    it("Should emit NumberStored event", async function () {
      await expect(simpleStorage.storeNumber(123))
        .to.emit(simpleStorage, "NumberStored")
        .withArgs(123, owner.address);
    });

    it("Should allow different users to store numbers", async function () {
      await simpleStorage.connect(addr1).storeNumber(100);
      await simpleStorage.connect(addr2).storeNumber(200);
      expect(await simpleStorage.getStoredNumber()).to.equal(200);
    });
  });

  describe("String Storage", function () {
    it("Should store a string", async function () {
      await simpleStorage.storeString("Base Network Rocks!");
      expect(await simpleStorage.getStoredString()).to.equal("Base Network Rocks!");
    });

    it("Should emit StringStored event", async function () {
      const testString = "Test String";
      await expect(simpleStorage.storeString(testString))
        .to.emit(simpleStorage, "StringStored")
        .withArgs(testString, owner.address);
    });

    it("Should not allow empty strings", async function () {
      await expect(simpleStorage.storeString(""))
        .to.be.revertedWith("String cannot be empty");
    });
  });

  describe("Boolean Storage", function () {
    it("Should store a boolean", async function () {
      await simpleStorage.storeBool(false);
      expect(await simpleStorage.getStoredBool()).to.equal(false);
    });

    it("Should emit BoolStored event", async function () {
      await expect(simpleStorage.storeBool(false))
        .to.emit(simpleStorage, "BoolStored")
        .withArgs(false, owner.address);
    });
  });

  describe("User Data Storage", function () {
    it("Should store user-specific data", async function () {
      await simpleStorage.connect(addr1).storeUserData(999, "User1 Data");
      const [number, text] = await simpleStorage.getUserData(addr1.address);
      expect(number).to.equal(999);
      expect(text).to.equal("User1 Data");
    });

    it("Should emit UserDataStored event", async function () {
      await expect(simpleStorage.connect(addr1).storeUserData(555, "Test Data"))
        .to.emit(simpleStorage, "UserDataStored")
        .withArgs(addr1.address, 555, "Test Data");
    });

    it("Should not allow empty string in user data", async function () {
      await expect(simpleStorage.storeUserData(123, ""))
        .to.be.revertedWith("String cannot be empty");
    });

    it("Should store different data for different users", async function () {
      await simpleStorage.connect(addr1).storeUserData(100, "User1");
      await simpleStorage.connect(addr2).storeUserData(200, "User2");

      const [number1, text1] = await simpleStorage.getUserData(addr1.address);
      const [number2, text2] = await simpleStorage.getUserData(addr2.address);

      expect(number1).to.equal(100);
      expect(text1).to.equal("User1");
      expect(number2).to.equal(200);
      expect(text2).to.equal("User2");
    });
  });

  describe("Reset Functionality", function () {
    it("Should reset all data", async function () {
      // Store some data first
      await simpleStorage.storeNumber(999);
      await simpleStorage.storeString("Before Reset");
      await simpleStorage.storeBool(false);

      // Reset
      await simpleStorage.resetAll();

      // Check reset values
      expect(await simpleStorage.getStoredNumber()).to.equal(0);
      expect(await simpleStorage.getStoredString()).to.equal("Reset!");
      expect(await simpleStorage.getStoredBool()).to.equal(false);
    });

    it("Should emit events on reset", async function () {
      await expect(simpleStorage.resetAll())
        .to.emit(simpleStorage, "NumberStored")
        .withArgs(0, owner.address)
        .and.to.emit(simpleStorage, "StringStored")
        .withArgs("Reset!", owner.address)
        .and.to.emit(simpleStorage, "BoolStored")
        .withArgs(false, owner.address);
    });

    it("Should not allow non-owner to reset", async function () {
      await expect(simpleStorage.connect(addr1).resetAll())
        .to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("View Functions", function () {
    it("Should return correct stored values", async function () {
      await simpleStorage.storeNumber(777);
      await simpleStorage.storeString("View Test");
      await simpleStorage.storeBool(false);

      expect(await simpleStorage.storedNumber()).to.equal(777);
      expect(await simpleStorage.storedString()).to.equal("View Test");
      expect(await simpleStorage.storedBool()).to.equal(false);
    });
  });
});