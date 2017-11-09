const models = require('../models');

module.exports = class {

  /**
   * Return all categories
   * @param {*} req 
   * @param {*} res 
   */
  findAll(req, res) {
    models.category.findAll().then((categories) => {
      res.json(categories);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
   * Return the requested category
   * @param {*} req 
   * @param {*} res 
   */
  findOne(req, res) {
    models.category.findById(req.params.id).then((category) => {
      if (category) {
        res.json(category);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
   * Create a new category from the body
   * @param {*} req 
   * @param {*} res 
   */
  create(req, res) {
    models.category.create(req.body).then((category) => {
      res.json(category);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
   * Delete the requested category
   * @param {*} req 
   * @param {*} res 
   */
  delete(req, res) {
    models.category.destroy({
      where: {
        id: req.params.id
      }
    }).then((count) => {
      res.sendStatus(count === 1 ? 200 : 404);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
};