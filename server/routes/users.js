const UserController = require('../controllers/users');

module.exports = (express, auth) => {

  const usersController = new UserController;
  const router = express.Router();

  router.get('/', auth, (req, res, next) => {
    usersController.findAll(req, res, next);
  });

  router.get('/:id', auth, (req, res) => {
    usersController.findOne(req, res);
  });

  router.post('/', (req, res) => {
    usersController.create(req, res);
  });

  router.put('/:id', auth, (req, res) => {
    usersController.update(req, res);
  });

  router.delete('/', auth, (req, res) => {
    usersController.delete(req, res);
  });

  return router;
};