pragma solidity ^0.4.24;

contract Bank {
  struct user {
    uint balance;
    bool isExsited;
  }

  mapping(string => user) users; // Mapping user's id to a user structure.

  function addUser(string userId, uint initialBalance) public returns (string) {
    require(isEmptyString(userId) == false, 'A user id has to be supplied.');
    require(users[userId].isExsited == false, 'The User id has already exsited.');
    require(initialBalance >= 0, 'The initial balance should be equal or greater than 0.');
    
    users[userId].balance = initialBalance;
    users[userId].isExsited = true;
    return userId;
  }

  function deposit(string userId, uint amount) public returns (uint) {
    require(isEmptyString(userId) == false, 'A user id has to be supplied.');
    require(users[userId].isExsited == true, 'The User is not exsit.');
    require(amount > 0, 'The deposit amount should be greater than 0.');

    users[userId].balance += amount;
    return users[userId].balance;
  }

  function withdraw(string userId, uint amount) public returns (uint) {
    require(isEmptyString(userId) == false, 'A user id has to be supplied.');
    require(users[userId].isExsited == true, 'The User is not exsit.');
    require(amount > 0, 'The withdraw amount should be greater than 0.');
    require(users[userId].balance >= amount, 'The user does not have enough balance.');

    users[userId].balance -= amount;
    return users[userId].balance;
  }

  function showBalance(string userId) public view returns (uint) {
    require(isEmptyString(userId) == false, 'A user id has to be supplied.');
    require(users[userId].isExsited == true, 'The User is not exsit.');

    return users[userId].balance;
  }

  /**
   * Test wether a string is empty.
   */
  function isEmptyString(string str) private view returns (bool) {
    bytes memory tempStr = bytes(str);
    return tempStr.length == 0 ? true : false;
  }
}
