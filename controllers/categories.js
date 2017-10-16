'use strict';

const models = require('../models');

module.exports = class {

  findAll(req, res) {
    models.category.findAll().then(categories => {
      res.json(categories);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  findOne(req, res) {
    models.category.findById(req.params.id).then(category => {
      if (category) {
        res.json(category);
      } else {
        res.sendStatus(404);
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  create(req, res) {
    models.category.create(req.body).then(() => {
      res.redirect('/');
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  delete(req, res) {
    models.category.destroy({
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