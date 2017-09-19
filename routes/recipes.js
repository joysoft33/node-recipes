let express = require('express');

let router = express.Router();

let recipes = [{
  title: 'Ma première recette',
  description: 'Ma description qsdf sdf dfqds f',
  image: '',
  count: 2,
  date: Date.now()
}, {
  title: 'Ma seconde recette',
  description: 'Description 2 zkjfg zdfze fd',
  image: '',
  count: 2,
  date: Date.now()
}];

router.get('/', function(req, res) {
  res.json(recipes);
});

router.get('/:id', function(req, res) {
  res.json(recipes[req.params.id]);
});

router.post('/add', function(req, res) {
  recipes.push(req.body);
  res.redirect('/');
});

module.exports = router;
