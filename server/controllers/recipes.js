const ServerError = require('../utilities/errors');

const mails = require('../utilities/mails');
const models = require('../models');

module.exports = class {

  /**
   * Return all recipes without their descriptions
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  findAll(req, res, next) {

    const options = {
      attributes: ['id', 'title', 'image', 'categoryId'],
      include: [{
        attributes: ['name'],
        model: models.category,
        as: 'category'
      }, {
        attributes: ['name'],
        model: models.user,
        as: 'user'
      }]
    };

    // Get category optional parameter
    if (req.query.category) {
      const category = parseInt(req.query.category, 10);
      if (category) {
        options.where = options.where || {};
        options.where.categoryId = category;
      }
    }

    let offset;
    let limit;

    // Get optional pagination info
    if (req.query.limit) {
      limit = parseInt(req.query.limit, 10);
      if (limit > 0) {
        offset = parseInt(req.query.offset, 10);
        if (offset >= 0) {
          options.offset = offset;
          options.limit = limit;
        }
      }
    }

    models.recipe.findAndCountAll(options).then((result) => {
      if (limit > 0) {
        result.offset = offset;
        result.limit = limit;
      }
      res.json(result);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Return the requested recipe details
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  findOne(req, res, next) {
    models.recipe.findById(req.params.id, {
      include: [{
        model: models.category,
        as: 'category'
      }, {
        attributes: ['name'],
        model: models.user,
        as: 'user'
      }]
    }).then((recipe) => {
      res.json(recipe);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Create a new recipe from the body data
   * Becareful: an error during email send imply an error on the create recipe command...
   * Is it really what should be done ?
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  create(req, res, next) {
    // Set here the recipe creator id
    req.body.userId = req.user.id;
    models.recipe.create(req.body).then((recipe) => {
      // Send notification email to the admin
      mails.sendRecipeValidation(recipe.get({
        plain: true
      }));
      res.json(recipe);
    }).then(() => {}).catch((err) => {
      next(err);
    });
  }

  /**
   * Update the requested recipe
   * Only the creator can modify its recipe
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  update(req, res, next) {
    models.recipe.findById(req.params.id).then((recipe) => {
      if (!req.user.isAdmin && (req.user.id !== recipe.userId)) {
        throw new ServerError(401, 'Not owner, cannot modify recipe');
      }
      return recipe.updateAttributes(req.body);
    }).then((recipe) => {
      res.json(recipe);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Delete the specified recipe. First find the requested recipe, then delete the downloaded image if any
   * and terminate by deleting the recipe itself
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  delete(req, res, next) {
    models.recipe.findById(req.params.id).then((recipe) => {
      if (!req.user.isAdmin && (req.user.id !== recipe.userId)) {
        throw new ServerError(401, 'Not owner, cannot delete recipe');
      }
      return recipe.destroy();
    }).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      next(err);
    });
  }
};