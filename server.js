'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const recipesRoutes = require('./routes/recipes');
const categoriesRoutes = require('./routes/categories');

const port = process.env.NODE_PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set static file directory
app.use(express.static('./public'));

// Set API routes
app.use('/recipes', recipesRoutes);
app.use('/categories', categoriesRoutes);

// Synchronize database with the previously declared models
models.sequelize.sync({
  alter: false
}).then((db) => {
  console.log('Database connected');
}).catch(err => {
  console.log('Error connecting database:', err);
});

// Start listening to external http requests
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});