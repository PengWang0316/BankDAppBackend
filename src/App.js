const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // using to solve Access-Control-Allow-Origin
const helmet = require('helmet');
const spdy = require('spdy');

const normalRouters = require('./routers/NormalRouters');

require('dotenv').config(); // Loading .env to process.env
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Definding the routers
app.use('/api/v1', normalRouters);

// Using for creating a http server. Development mode.
app.listen(process.env.SERVER_PORT, _ => console.log(`The service is started. port:${process.env.SERVER_PORT}`));

/*
* This is set for AWS load balancer's healthy check.
*/
// app.get('/healthcheck', (req, res) => {
//   res.end('ok');
// });

// Production https server.
// const credentials = { // Config to use ssl
//   key: fs.readFileSync('/etc/letsencrypt/live/kairoscope.resonancepath.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/kairoscope.resonancepath.com/fullchain.pem'),
// };
// spdy.createServer(credentials, app).listen(process.env.SERVER_PORT, _ => console.log(`The service is started. port:${process.env.SERVER_PORT}`));

