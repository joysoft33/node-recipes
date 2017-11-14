const multer = require('multer');
const path = require('path');
const fs = require('fs');

const sendMail = require('../mailer');
const models = require('../models');

const config = require('../config')();

const uploadPath = path.resolve(config.publicPath, config.imagesPath);

const upload = multer({
  dest: uploadPath
}).single('file');

module.exports = class {

  /**
   * Return all recipes without their descriptions
   * @param {*} req 
   * @param {*} res 
   */
  findAll(req, res) {

    let options = {
      attributes: ['id', 'title', 'image', 'categoryId'],
      include: [{
        attributes: ['name'],
        model: models.category,
        as: 'category'
      }]
    };

    let categoryId = parseInt(req.query.categoryId);
    if (categoryId) {
      options.where = {
        categoryId: categoryId
      };
    }

    models.recipe.findAll(options).then((recipes) => {
      res.json(recipes);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
   * Return the requested recipe details
   * @param {*} req 
   * @param {*} res 
   */
  findOne(req, res) {
    models.recipe.findById(req.params.id, {
      include: [{
        model: models.category,
        as: 'category'
      }]
    }).then((recipe) => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
   * Create a new recipe from the body data
   * @param {*} req 
   * @param {*} res 
   */
  create(req, res) {
    let result;
    models.recipe.create(req.body).then((recipe) => {
      result = recipe;
      return sendMail('newRecipe', recipe.get({plain: true}));
    }).then((info) => {
      res.json(result);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
   * Upload recipe image
   * @param {*} req 
   * @param {*} res 
   */
  uploadImage(req, res) {
    upload(req, res, (err) => {
      if (err) {
        res.json(err);
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
  _deleteImage(recipe) {
    return new Promise((resolve, reject) => {
      if (recipe.image) {
        let imagePath = path.resolve(config.publicPath, recipe.image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log(`Error deleting image ${recipe.image}`, err);
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
   */
  delete(req, res) {
    models.recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then((recipe) => {
      return this._deleteImage(recipe);
    }).then((recipe) => {
      return recipe.destroy();
    }).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
};