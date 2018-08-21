const BlockChainHelper = require('../../utils/BlockChainHelper');
const logger = require('../../utils/Logger');

module.exports = (req, res) => {
  BlockChainHelper.getBalance('user1234').then(balance => res.json(balance)).catch(err => {
    console.log(err);
    res.end();
  });
};
