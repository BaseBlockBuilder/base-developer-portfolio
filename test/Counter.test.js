const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here
    const Counter = await ethers.getContractFactory("Counter");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new Counter contract before each test
    counter = await Counter.deploy();
    await counter.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await counter.owner()).to.equal(owner.address);
    });

    it("Should start with a count of 0", async function () {
      expect(await counter.getCount()).to.equal(0);
    });
  });

  describe("Incrementing", function () {
    it("Should increment the count", async function () {
      await counter.increment();
      expect(await counter.getCount()).to.equal(1);
    });

    it("Should emit CountUpdated event on increment", async function () {
      await expect(counter.increment())
        .to.emit(counter, "CountUpdated")
        .withArgs(1, "increment");
    });
  });

  describe("Decrementing", function () {
    it("Should decrement the count", async function () {
      await counter.increment();
      await counter.increment();
      await counter.decrement();
      expect(await counter.getCount()).to.equal(1);
    });

    it("Should not decrement below zero", async function () {
      await expect(counter.decrement()).to.be.revertedWith(
        "Counter: cannot decrement below zero"
      );
    });

    it("Should emit CountUpdated event on decrement", async function () {
      await counter.increment();
      await expect(counter.decrement())
        .to.emit(counter, "CountUpdated")
        .withArgs(0, "decrement");
    });
  });

  describe("Resetting", function () {
    it("Should reset the count to zero", async function () {
      await counter.increment();
      await counter.increment();
      await counter.reset();
      expect(await counter.getCount()).to.equal(0);
    });

    it("Should emit CountUpdated event on reset", async function () {
      await counter.increment();
      await expect(counter.reset())
        .to.emit(counter, "CountUpdated")
        .withArgs(0, "reset");
    });

    it("Should not allow non-owner to reset", async function () {
      await expect(counter.connect(addr1).reset()).to.be.revertedWith(
        "Only owner can call this function"
      );
    });
  });
});
