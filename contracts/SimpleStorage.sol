// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleStorage
 * @dev A contract for storing and retrieving various data types
 * @author Base Developer Portfolio
 */
contract SimpleStorage {
    // State variables
    uint256 public storedNumber;
    string public storedString;
    bool public storedBool;
    address public owner;
    
    // Mapping for user data
    mapping(address => uint256) public userNumbers;
    mapping(address => string) public userStrings;
    
    // Events
    event NumberStored(uint256 indexed newNumber, address indexed user);
    event StringStored(string newString, address indexed user);
    event BoolStored(bool newBool, address indexed user);
    event UserDataStored(address indexed user, uint256 number, string data);

    // Constructor
    constructor() {
        owner = msg.sender;
        storedNumber = 0;
        storedString = "Hello Base!";
        storedBool = true;
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @dev Store a number
     * @param _number The number to store
     */
    function storeNumber(uint256 _number) public {
        storedNumber = _number;
        emit NumberStored(_number, msg.sender);
    }

    /**
     * @dev Store a string
     * @param _text The string to store
     */
    function storeString(string memory _text) public {
        require(bytes(_text).length > 0, "String cannot be empty");
        storedString = _text;
        emit StringStored(_text, msg.sender);
    }

    /**
     * @dev Store a boolean
     * @param _bool The boolean to store
     */
    function storeBool(bool _bool) public {
        storedBool = _bool;
        emit BoolStored(_bool, msg.sender);
    }

    /**
     * @dev Store user-specific data
     * @param _number User's number
     * @param _text User's string
     */
    function storeUserData(uint256 _number, string memory _text) public {
        require(bytes(_text).length > 0, "String cannot be empty");
        userNumbers[msg.sender] = _number;
        userStrings[msg.sender] = _text;
        emit UserDataStored(msg.sender, _number, _text);
    }

    /**
     * @dev Get stored number
     * @return The stored number
     */
    function getStoredNumber() public view returns (uint256) {
        return storedNumber;
    }

    /**
     * @dev Get stored string
     * @return The stored string
     */
    function getStoredString() public view returns (string memory) {
        return storedString;
    }

    /**
     * @dev Get stored boolean
     * @return The stored boolean
     */
    function getStoredBool() public view returns (bool) {
        return storedBool;
    }

    /**
     * @dev Get user's stored data
     * @param _user The user's address
     * @return number The user's stored number
     * @return text The user's stored string
     */
    function getUserData(address _user) public view returns (uint256 number, string memory text) {
        return (userNumbers[_user], userStrings[_user]);
    }

    /**
     * @dev Reset all data (owner only)
     */
    function resetAll() public onlyOwner {
        storedNumber = 0;
        storedString = "Reset!";
        storedBool = false;
        emit NumberStored(0, msg.sender);
        emit StringStored("Reset!", msg.sender);
        emit BoolStored(false, msg.sender);
    }
}