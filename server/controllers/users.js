const models = require('../models');

module.exports = class {

  /**
   * Return all users
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  findAll(req, res, next) {
    models.user.findAll({
      attributes: ['id', 'name', 'email', 'isAdmin', 'createdAt', 'address', 'location'],
      include: [{
        attributes: [
          [models.sequelize.fn('COUNT', models.sequelize.col('recipes.id')), 'count']
        ],
        model: models.recipe,
        duplicating: false,
        required: false
      }],
      raw: true,
      group: ['id']
    }).then((users) => {
      res.json(users.map((item) => {
        item.recipesCount = item['recipes.count'];
        item['recipes.count'] = undefined;
        return item;
      }));
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Return the requested user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  findOne(req, res, next) {
    if ((req.user.id === +(req.params.id)) || req.user.isAdmin) {
      models.user.findById(req.params.id, {
        include: [{
          attributes: ['id', 'title'],
          model: models.recipe,
          as: 'recipes'
        }]
      }).then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      }).catch((err) => {
        next(err);
      });
    } else {
      res.sendStatus(403);
    }
  }

  /**
   * Find users near the given position
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  findAround(req, res, next) {
    models.sequelize.query('CALL findAround(:latitude, :longitude, :radius, :limit)', {
      replacements: {
        latitude: parseFloat(req.query.lat),
        longitude: parseFloat(req.query.lng),
        radius: parseInt(req.query.radius, 10),
        limit: parseInt(req.query.limit, 10)
      }
    }).then((results) => {
      res.json(results);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Create a new user from the body
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  create(req, res, next) {
    // Never allows to create an admin user !
    req.body.isAdmin = false;
    req.body.location = models.sequelize.gpsToLocation(req.body.lat, req.body.lng);
    models.user.create(req.body).then((user) => {
      res.json(user);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Update the given user from the body
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  update(req, res, next) {
    if ((req.user.id === +(req.params.id)) || req.user.isAdmin) {
      models.user.findById(req.params.id).then((user) => {
        req.body.location = models.sequelize.gpsToLocation(req.body.lat, req.body.lng);
        return user.update(req.body);
      }).then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        next(err);
      });
    } else {
      res.sendStatus(403);
    }
  }

  /**
   * Delete the requested user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  delete(req, res, next) {
    models.user.destroy({
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