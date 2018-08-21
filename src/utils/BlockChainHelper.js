const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const path = require('path');
// const BankJsonFile = require('../../build/contracts/Bank.json');
const BankContractJSON  = require(path.join(__dirname, '../../build/contracts/Bank.json'));
const config = require('../config');

const BlockChainHelper = {
  web3Provider: null,
  contracts: {},

  init: function() {
     return this.initWeb3();
  },

  initWeb3: function() {
    // if (typeof web3 !== 'undefined') this.web3Provider = web3.currentProvider;
    // // If no injected web3 instance is detected, fall back to Ganache
    // else this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    // web3 = new Web3(this.web3Provider);
    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    // web3.eth.defaultAccount = web3.eth.accounts[0];console.log(web3.eth.accounts[0]);
    return this.initContract();
  },

  initContract: function() {
    // $.getJSON('Bank.json', function(data) {
    //   var BankArtifact = data;
    //   this.contracts.Bank = TruffleContract(BankArtifact);
    //   this.contracts.Bank.setProvider(this.web3Provider);
    // });
    // const data = JSON.parse('Bank.json');
    this.contracts.Bank = TruffleContract(BankContractJSON);
    this.contracts.Bank.setProvider(this.web3Provider);
    const bankContract = this.contracts.Bank;
    if (typeof bankContract.currentProvider.sendAsync !== "function") {
      bankContract.currentProvider.sendAsync = function() {
        return bankContract.currentProvider.send.apply(
          bankContract.currentProvider, arguments
        );
      };
    }
    // this.bank = this.contracts.Bank.at('0x6305d5887e707b1BbBC22fd2ce15466e66751cE7');
  },

  addUser: function(userId, initialBalance) {
    // this.contracts.Bank.deployed().then(instance => instance.addUser(userId, initialBalance)).catch(err => console.error(err));
    this.contracts.Bank.deployed().then(instance => instance.addUser(userId, initialBalance, { from: config.DEFUALT_ACCOUNT })).catch(err => console.error(err));
  },

  getBalance: function(userId) {
    return new Promise((resolve, reject) => {
      this.contracts.Bank.deployed().then(instance => resolve(instance.showBalance.call(userId, { from: config.DEFUALT_ACCOUNT }))).catch(err => reject(err));
    });
  },

  deposit: function(userId, amount) {
    return new Promise((resolve, reject) => {
      this.contracts.Bank.deployed().then(instance => resolve(instance.deposit(userId, amount, { from: config.DEFUALT_ACCOUNT }))).catch(err => reject(err));
    });
  },

  withdraw: function(userId, amount) {
    return new Promise((resolve, reject) => {
      this.contracts.Bank.deployed().then(instance => resolve(instance.withdraw(userId, amount, { from: config.DEFUALT_ACCOUNT }))).catch(err => reject(err));
    });
  }
};
BlockChainHelper.init();

module.exports = BlockChainHelper;
