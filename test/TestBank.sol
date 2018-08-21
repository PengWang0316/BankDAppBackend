pragma solidity ^0.4.24;

import 'truffle/Assert.sol';
import 'truffle/DeployedAddresses.sol';
import '../contracts/Bank.sol';

contract TestBank {
  Bank bank = Bank(DeployedAddresses.Bank());
  string userId = 'userIdA';

  function testAddUser() public {
    bank.addUser(userId, 100);
    Assert.equal(bank.showBalance(userId), 100, 'The balance should be 100');
  }

  function testDeposit() public {
    bank.deposit(userId, 200);
    Assert.equal(bank.showBalance(userId), 300, 'The balance should be 300');
  }

  function testWithdraw() public {
    bank.withdraw(userId, 100);
    Assert.equal(bank.showBalance(userId), 200, 'The balance should be 200');
  }
}
