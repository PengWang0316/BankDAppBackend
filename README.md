# The demo code for the bank DApp

This repository is the back-end code for the bank DApp.

NodeJS will receive the front-end call and then save and retrieve data from the Ehtereum block chain platform via a smart contract.

## File Structure

- src has all NodeJS file
- contracts has Bank contract
- __test__ has NodeJS test code

## How it works

Requirement: Truffle, Ganache or Ganache-cli, NodeJS 8.x.x, NPM
MongoDB has already been depoloyed on the cloud (Please clear all data under the users collection)

1. Run Ganache or Ganache-cli
2. Run truffle test
3. Run npm install
3. Run node.js src/App.js

## Test
 - NodeJS file test
 ```
 npm test
 ```
 - Smart contract test
 ```
 truffle test
 ```