const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Initialize the global config with server base path
const config = require('./server/config')(__dirname);

const models = require('./server/models');
const routes = require('./server/routes');

const app = express();

// DEclare the cookie parser middleware
app.use(cookieParser());

// Declare parsers for urlencoded and json bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set static files directory
app.use(express.static(config.publicPath));
app.use('/vendors', express.static('node_modules'));

// Set API routes
routes(app, express);

// Synchronize database with the previously declared models
models.sequelize.sync({
  alter: false
}).then((db) => {
  console.log('Database connected');
}).catch((err) => {
  console.log('Error connecting database:', err);
});

// Start listening to external http requests
let server = app.listen(config.serverPort, () => {
  console.log(`Server started - port:${config.serverPort} ("${config.env}")`);
});

module.exports = server;