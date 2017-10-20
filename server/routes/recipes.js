const RecipesController = require('../controllers/recipes');
const express = require('express');

const recipesController = new RecipesController;
const router = express.Router();

router.get('/', (req, res) => {
  recipesController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  recipesController.findOne(req, res);
});

router.post('/', (req, res) => {
  recipesController.create(req, res);
});

router.delete('/:id', (req, res) => {
  recipesController.delete(req, res);
});

module.exports = router;