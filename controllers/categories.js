'use strict';

const models = require('../models');

module.exports = class {

  findAll(req, res) {
    models.Category.findAll().then(categories => {
      res.json(categories);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  findOne(req, res) {
    models.Category.findById(req.params.id).then(category => {
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
    models.Category.create(req.body).then(() => {
      res.redirect('/');
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  delete(req, res) {
    models.Category.destroy({
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