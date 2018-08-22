const normalRouter = require('express').Router();
// const winston = require('winston');  Moved out to the utils

require('dotenv').config(); // Loading .env to process.env

// Functions import
const getFetchAllAccount = require('./functions/GetFetchAllAccount');
const getFetchBalance = require('./functions/GetFetchBalance');
const putDeposit = require('./functions/PutDeposit');
const putWithdraw = require('./functions/PutWithdraw');

const postAddUser = require('./functions/PostAddUser');

/* Fetching the user's balance */
normalRouter.get('/fetchBalance', getFetchBalance);

/* Depositing some money */
normalRouter.get('/deposit', putDeposit);

/* Withdrawing some money */
normalRouter.get('/withdraw', putWithdraw);

/* Fetching all account number */
normalRouter.get('/fetchAllAccount', getFetchAllAccount);

/* Adding a new user */
normalRouter.post('/addUser', postAddUser);

module.exports = normalRouter;
