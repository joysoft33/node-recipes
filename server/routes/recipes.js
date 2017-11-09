const RecipesController = require('../controllers/recipes');

module.exports = (express, auth) => {

  const recipesController = new RecipesController;
  const router = express.Router();

  router.get('/', (req, res, next) => {
    recipesController.findAll(req, res);
  });

  router.get('/:id', (req, res) => {
    recipesController.findOne(req, res);
  });

  router.post('/', auth, (req, res) => {
    recipesController.create(req, res);
  });

  router.post('/image', auth, (req, res) => {
    recipesController.uploadImage(req, res);
  });

  router.delete('/:id', auth, (req, res) => {
    recipesController.delete(req, res);
  });

  return router;
};