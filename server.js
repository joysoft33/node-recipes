const express = require('express');
const bodyParser = require('body-parser');

const models = require('./server/models');
const recipesRoutes = require('./server/routes/recipes');
const categoriesRoutes = require('./server/routes/categories');

const port = process.env.NODE_PORT || 3000;
const app = express();

// Declare parsers for urlencoded and json bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set static files directory
app.use(express.static('./public'));
app.use('/vendors', express.static('node_modules'));

// Set API routes
app.use('/recipes', recipesRoutes);
app.use('/categories', categoriesRoutes);

// Synchronize database with the previously declared models
models.sequelize.sync({
  alter: false
}).then((db) => {
  console.log('Database connected');
}).catch((err) => {
  console.log('Error connecting database:', err);
});

// Start listening to external http requests
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});