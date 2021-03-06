const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const winston = require('winston');

require('dotenv').config();
// Loading .env to process.env
const DB_URL = process.env.DB_HOST;
const COLLECTION_USERS = 'Users';

const DB_NAME = process.env.DB_NAME;

/** Setting up the Winston logger.
  * Under the development mode log to console.
*/
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new (winston.transports.Console)()
  ]
});

/** Replaces the previous transports with those in the
new configuration wholesale.
  * When under the production mode, log to a file.
*/
if (process.env.NODE_ENV === 'production') logger.configure(
  {
    level: 'error',
    transports: [
      new (winston.transports.File)({ filename: 'error.log' })
    ]
  }
);

/*
* Use to execute the database
* Other function can call it to get the connection.
* Pass a function that contains the executed code.
*/
// const connectToDb = executeFunction => {
//   MongoClient.connect(DB_URL, (err, client) => {
//     if (err) logger.error('Unable to connect to the mongoDB server. Error:', err);
//     else
//             // Run given mehtod
//       executeFunction(client.db(DB_NAME));

//     client.close();
//   });
// };
const connectToDb = async executeFunction => {
  try {
    const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true });
    executeFunction(client.db(DB_NAME));
    client.close();
  } catch (e) {
    logger.error('Unable to connect to the mongoDB server. Error:', e);
  }
};

/* Using Promise to wrap connection and toArray */
const promiseFindResult = callback => new Promise((resolve, reject) => {
  connectToDb(db => {
    callback(db).toArray((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
});

const promiseNextResult = callback => new Promise((resolve, reject) => {
  connectToDb(db => {
    callback(db).next((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
});

const promiseInsertResult = callback => new Promise((resolve, reject) => {
  connectToDb(db => {
    callback(db).then(result => {
      resolve();
    });
  });
});

const promiseReturnResult = callback => new Promise((resolve, reject) => {
  connectToDb(db => {
    resolve(callback(db));
  });
});


/* Start Database functions */

/* Fetch all acount information */
exports.fetchAllAccount = () => promiseFindResult(db => db.collection(COLLECTION_USERS).find({}));

/* Adding a new user */
exports.addUser = user => new Promise(
  (resolve, reject) => connectToDb(db => db.collection(COLLECTION_USERS).insertOne(user)
    .then((result, err) => {
      if (err) reject(err);
      resolve(result.ops[0]);
    }))
);
