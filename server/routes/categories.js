'use strict';

const CategoryController = require('../controllers/categories');
const express = require('express');

const categoriesController = new CategoryController;
const router = express.Router();

router.get('/', (req, res) => {
  categoriesController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  categoriesController.findOne(req, res);
});

router.post('/', (req, res) => {
  categoriesController.create(req, res);
});

router.delete('/', (req, res) => {
  categoriesController.delete(req, res);
});

module.exports = router;