const logger = require('../utilities/logger');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const mails = require('../utilities/mails');
const models = require('../models');

const config = require('../config')();

const uploadPath = path.resolve(config.serverPath, config.imagesPath);

const upload = multer({
  dest: uploadPath
}).single('file');

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

    const categoryId = parseInt(req.query.categoryId, 10);
    if (categoryId) {
      options.where = {
        categoryId: categoryId
      };
    }

    models.recipe.findAll(options).then((recipes) => {
      res.json(recipes);
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
      if (recipe) {
        res.json(recipe);
      } else {
        res.sendStatus(404);
      }
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
    }).then(() => {
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Upload recipe image
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  uploadImage(req, res, next) {
    upload(req, res, (err) => {
      if (err) {
        next(err);
      } else {
        res.json({
          originalFilename: req.file.originalname,
          url: path.join(config.imagesPath, req.file.filename)
        });
      }
    });
  }

  /**
   * Delete the recipe image if any. Always resolve the promise,
   * even upon image deletion error
   * @param {*} recipe
   * @return {Promise}
   */
  deleteImage(recipe) {
    return new Promise((resolve) => {
      if (recipe.image) {
        const imagePath = path.resolve(config.serverPath, recipe.image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            logger.error(`recipes.deleteImage ${recipe.image}`, err);
          }
          resolve(recipe);
        });
      } else {
        resolve(recipe);
      }
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
    models.recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then((recipe) => {
      return this.deleteImage(recipe);
    }).then((recipe) => {
      return recipe.destroy();
    }).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      next(err);
    });
  }
};