const BlockChainHelper = require('../../utils/BlockChainHelper');
const Logger = require('../../utils/Logger');

module.exports = (req, res) => BlockChainHelper.getBalance(req.params.id)
  .then(balance => res.json(balance)).catch(err => {
    Logger.error('/fetchBalance', err);
    res.end();
  });
