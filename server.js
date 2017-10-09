const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const recipesRoutes = require('./routes/recipes');

const sequelize = new Sequelize('mysql://root@localhost:3306/recipes');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('./public'));

app.use('/recipes', recipesRoutes(sequelize));

sequelize.sync().then((db) => {
  console.log('Database connected');
}).catch(err => {
  console.log('Error connecting database:', err);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});