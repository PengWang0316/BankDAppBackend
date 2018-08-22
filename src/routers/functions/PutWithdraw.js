const BlockChainHelper = require('../../utils/BlockChainHelper');
const Logger = require('../../utils/Logger');

module.exports = (req, res) => BlockChainHelper.withdraw(req.body.userId, req.body.amount)
  .then(balance => res.json(balance)).catch(err => {
    Logger.error('/withdraw', err);
    res.end();
  });
