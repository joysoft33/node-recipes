const Sequelize = require('sequelize');
const express = require('express');
const sendMail = require('../mailer');

const router = express.Router();

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

  router.get('/', (req, res) => {
    Recipe.findAll().then(recipes => {
      res.json(recipes);
    }).catch(err => {
      res.sendStatus(500);
    });
  });

  router.get('/:id', (req, res) => {
    Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(recipe => {
      res.json(recipe);
    }).catch(err => {
      res.sendStatus(500);
    });
  });

  router.post('/', (req, res) => {
    let result;
    Recipe.create(req.body).then(recipe => {
      result = recipe;
      return sendMail(recipe);
    }).then(info => {
      res.json(result);
    }).catch(err => {
      res.sendStatus(500);
    });
  });

  return router;
}