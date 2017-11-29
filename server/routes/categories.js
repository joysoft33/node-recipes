const CategoryController = require('../controllers/categories');

module.exports = (express, auth) => {

  const categoriesController = new CategoryController();
  const router = express.Router();

  router.get('/', (req, res, next) => {
    categoriesController.findAll(req, res, next);
  });

  router.get('/:id', auth.user, (req, res, next) => {
    categoriesController.findOne(req, res, next);
  });

  router.post('/', auth.admin, (req, res, next) => {
    categoriesController.create(req, res, next);
  });

  router.delete('/', auth.admin, (req, res, next) => {
    categoriesController.delete(req, res, next);
  });

  return router;
};