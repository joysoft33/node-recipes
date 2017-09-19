let express = require('express');
let bodyParser = require('body-parser');
let recipesRoutes = require('./routes/recipes');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/recipes', recipesRoutes);

let server = app.listen(8080, function() {
  console.log('Server started on port 8080');
});
