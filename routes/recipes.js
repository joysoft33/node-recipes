let Sequelize = require('sequelize');
let express = require('express');

let router = express.Router();

module.exports = function (sequelize) {

  const Recipe = sequelize.define('recipe', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: Sequelize.TEXT,
    image: Sequelize.STRING,
    count: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 12
      }
    }
  });

  router.get('/', function (req, res) {
    Recipe.findAll().then(recipes => {
      res.json(recipes);
    }).catch(err => {
      res.sendStatus(500);
    });
  });

  router.get('/:id', function (req, res) {
    Recipe.findAll({
      where: {
        id: req.params.id
      }
    }).then(recipe => {
      res.json(recipe[0]);
    }).catch(err => {
      res.sendStatus(500);
    });
  });

  router.post('/add', function (req, res) {
    Recipe.create(req.body).then(() => {
      res.redirect('/');
    }).catch(err => {
      res.sendStatus(500);      
    });
  });

  return router;
}