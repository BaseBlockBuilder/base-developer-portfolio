// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Counter
 * @dev A simple counter contract with increment, decrement, and reset functionality
 */
contract Counter {
    uint256 public count;
    address public owner;

    event CountUpdated(uint256 newCount, string operation);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @dev Increments the counter by 1
     */
    function increment() public {
        count += 1;
        emit CountUpdated(count, "increment");
    }

    /**
     * @dev Decrements the counter by 1
     */
    function decrement() public {
        require(count > 0, "Counter: cannot decrement below zero");
        count -= 1;
        emit CountUpdated(count, "decrement");
    }

    /**
     * @dev Resets the counter to 0
     */
    function reset() public onlyOwner {
        count = 0;
        emit CountUpdated(count, "reset");
    }

    /**
     * @dev Returns the current count
     * @return The current count value
     */
    function getCount() public view returns (uint256) {
        return count;
    }
}
