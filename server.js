'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const recipesRoutes = require('./routes/recipes');
const categoriesRoutes = require('./routes/categories');

const app = express();
let port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

// Set static file directory
app.use(express.static('./public'));

// Set API routes
app.use('/recipes', recipesRoutes);
app.use('/categories', categoriesRoutes);

// Synchronize database with the previously declared models
models.sequelize.sync({
  alter: true
}).then((db) => {
  console.log('Database connected');
}).catch(err => {
  console.log('Error connecting database:', err);
});

// Start listening to external http requests
let server = app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});