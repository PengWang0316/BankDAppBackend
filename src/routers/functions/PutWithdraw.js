const BlockChainHelper = require('../../utils/BlockChainHelper');
const logger = require('../../utils/Logger');

module.exports = (req, res) => {
  BlockChainHelper.withdraw('user1234', 100).then(balance => res.json(balance)).catch(err => {
    console.log(err);
    res.end();
  });
};
