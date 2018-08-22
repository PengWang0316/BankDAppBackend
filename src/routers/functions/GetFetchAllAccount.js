const logger = require('../../utils/Logger');
const MongoDB = require('../../MongoDB');

module.exports = (req, res) => MongoDB.fetchAllAccount()
  .then(data => res.json(data))
  .catch(err => {
    logger.error('/fetchAllAccount', err);
    res.end();
  });
