const BlockChainHelper = require('../../utils/BlockChainHelper');
module.exports = (req, res) => {
  BlockChainHelper.addUser('user1234', 200);
  res.end();
};
