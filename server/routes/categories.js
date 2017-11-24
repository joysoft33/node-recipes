const CategoryController = require('../controllers/categories');

module.exports = (express, auth) => {

  const categoriesController = new CategoryController();
  const router = express.Router();

  router.get('/', (req, res) => {
    categoriesController.findAll(req, res);
  });

  router.get('/:id', auth.user, (req, res) => {
    categoriesController.findOne(req, res);
  });

  router.post('/', auth.admin, (req, res) => {
    categoriesController.create(req, res);
  });

  router.delete('/', auth.admin, (req, res) => {
    categoriesController.delete(req, res);
  });

  return router;
};