'use strict';

const sendMail = require('../mailer');
const models = require('../models');

module.exports = class {

  findAll(req, res) {
    models.recipe.findAll({
      attributes: ['id', 'title', 'image', 'categoryId'],
      include: [{
        attributes: ['name'],
        model: models.category,
        as: 'category'
      }]
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
    let result;
    models.recipe.create(req.body).then(recipe => {
      result = recipe;
      return sendMail(recipe);
    }).then(info => {
      res.json(result);
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