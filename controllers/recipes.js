'use strict';

const models = require('../models');

module.exports = class {

  findAll(req, res) {
    models.Recipe.findAll().then(recipes => {
      res.json(recipes);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  findOne(req, res) {
    models.Recipe.findById(req.params.id).then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.sendStatus(404);        
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  create(req, res) {
    models.Recipe.create(req.body).then(() => {
      res.redirect('/');
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  delete(req, res) {
    models.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.sendStatus(200);
    }).catch(err => {
      res.status(500).send(err);
    });
  }
}