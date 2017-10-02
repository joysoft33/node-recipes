let express = require('express');
let bodyParser = require('body-parser');
let Sequelize = require('sequelize');
let recipesRoutes = require('./routes/recipes');

const URI = 'mysql://root@localhost:3306/recipes';

let sequelize = new Sequelize(URI);
let app = express();

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

let server = app.listen(8080, function () {
  console.log('Server started on port 8080');
});