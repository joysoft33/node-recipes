const models = require('../models');

module.exports = class {

  /**
   * Return all categories
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  findAll(req, res, next) {
    models.category.findAll().then((categories) => {
      res.json(categories);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Return the requested category
   * @param {*} req
   * @param {*} res
   */
  findOne(req, res, next) {
    models.category.findById(req.params.id).then((category) => {
      if (category) {
        res.json(category);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Create a new category from the body
   * @param {*} req
   * @param {*} res
   */
  create(req, res, next) {
    models.category.create(req.body).then((category) => {
      res.json(category);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Delete the requested category
   * @param {*} req
   * @param {*} res
   */
  delete(req, res, next) {
    models.category.destroy({
      where: {
        id: req.params.id
      }
    }).then((count) => {
      res.sendStatus(count === 1 ? 200 : 404);
    }).catch((err) => {
      next(err);
    });
  }
};