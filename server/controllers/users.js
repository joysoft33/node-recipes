const models = require('../models');

module.exports = class {

  /**
   * Return all users
   * @param {*} req 
   * @param {*} res 
   */
  findAll(req, res) {
    if (!req.user.isAdmin) {
      res.sendStatus(403);
    } else {
      models.user.findAll().then((users) => {
        res.json(users);
      }).catch((err) => {
        res.status(500).send(err.errors);
      });
    }
  }

  /**
   * Return the requested user
   * @param {*} req 
   * @param {*} res 
   */
  findOne(req, res) {
    if ((req.user.id !== req.params.id) && !req.user.isAdmin) {
      res.sendStatus(403);
    } else {
      models.user.findById(req.params.id).then((users) => {
        if (users) {
          res.json(users);
        } else {
          res.sendStatus(404);
        }
      }).catch((err) => {
        res.status(500).send(err.errors);
      });
    }
  }

  /**
   * Create a new user from the body
   * @param {*} req 
   * @param {*} res 
   */
  create(req, res) {
    models.user.create(req.body).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(500).send(err.errors);
    });
  }

  /**
   * Update the given user from the body
   * @param {*} req 
   * @param {*} res 
   */
  update(req, res) {
    if ((req.user.id !== req.params.id) && !req.user.isAdmin) {
      res.sendStatus(403);
    } else {
      models.user.update(req.body, {
        where: {
          id: req.params.id
        }
      }).spread((count, users) => {
        res.sendStatus(count ? 200 : 404);
      }).catch((err) => {
        res.status(500).send(err.errors);
      });
    }
  }

  /**
   * Delete the requested user
   * @param {*} req 
   * @param {*} res 
   */
  delete(req, res) {
    if (!req.user.isAdmin) {
      res.sendStatus(403);
    } else {
      models.user.destroy({
        where: {
          id: req.params.id
        }
      }).then((count) => {
        res.sendStatus(count === 1 ? 200 : 404);
      }).catch((err) => {
        res.status(500).send(err.errors);
      });
    }
  }
};