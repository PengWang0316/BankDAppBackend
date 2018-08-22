const BlockChainHelper = require('../../utils/BlockChainHelper');
const MongoDB = require('../../MongoDB');
const Logger = require('../../utils/Logger');

module.exports = (req, res) => MongoDB.addUser({
  firstName: req.body.firstName, lastName: req.body.lastName
}).then(id => {
  BlockChainHelper.addUser(id, req.body.initialAmount);
  res.json(id);
}).catch(err => {
  Logger.error('/addUser', err);
  res.end();
});
