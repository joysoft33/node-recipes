const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Initialize the global config with server base path
const config = require('./config')(__dirname);
const logger = require('./utilities/logger');
const models = require('./models');
const routes = require('./routes');

const app = express();

// DEclare the cookie parser middleware
app.use(cookieParser());

// Declare parsers for urlencoded and json bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set static files directory

app.use('/admin', express.static(path.join(config.serverPath, 'admin')));
app.use('/images', express.static(path.join(config.serverPath, 'images')));
app.use(express.static(path.join(config.serverPath, 'public')));

// Set API routes
routes(app, express);

// Synchronize database with the previously declared models
models.sequelize.sync({
  alter: false
}).then(() => {
  logger.info('Database connected');
}).catch((err) => {
  logger.error('Error connecting database:', err);
});

// Start listening to external http requests
const server = app.listen(config.serverPort, () => {
  logger.info(`Server started - port:${config.serverPort} ("${config.env}")`);
});

module.exports = server;