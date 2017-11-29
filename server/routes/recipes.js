const RecipesController = require('../controllers/recipes');

module.exports = (express, auth) => {

  const recipesController = new RecipesController();
  const router = express.Router();

  router.get('/', (req, res, next) => {
    recipesController.findAll(req, res, next);
  });

  router.get('/:id', (req, res, next) => {
    recipesController.findOne(req, res, next);
  });

  router.post('/', auth.user, (req, res, next) => {
    recipesController.create(req, res, next);
  });

  router.post('/image', auth.user, (req, res, next) => {
    recipesController.uploadImage(req, res, next);
  });

  router.delete('/:id', auth.admin, (req, res, next) => {
    recipesController.delete(req, res, next);
  });

  return router;
};