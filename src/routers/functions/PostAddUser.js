const BlockChainHelper = require('../../utils/BlockChainHelper');
const MongoDB = require('../../MongoDB');
const Logger = require('../../utils/Logger');

module.exports = (req, res) => MongoDB.addUser({
  firstName: req.body.firstName, lastName: req.body.lastName
}).then(user => {
  BlockChainHelper.addUser(user._id.toString(), req.body.initailAmount * 1);
  res.json(user._id);
}).catch(err => {
  Logger.error('/addUser', err);
  res.end();
});
