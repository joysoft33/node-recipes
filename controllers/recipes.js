'use strict';

const models = require('../models');

module.exports = class {

  findAll(req, res) {
    models.recipe.findAll({
      attributes: ['id', 'title', 'image', 'categoryId']
    }).then(recipes => {
      res.json(recipes);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  findOne(req, res) {
    models.recipe.findById(req.params.id, {
      include: [{
        model: models.category,
        as: 'category'
      }]
    }).then(recipe => {
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
    models.recipe.create(req.body).then(recipe => {
      res.redirect('/');
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  delete(req, res) {
    models.recipe.destroy({
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