const UserController = require('../controllers/users');

module.exports = (express, auth) => {

  const usersController = new UserController();
  const router = express.Router();

  router.get('/', auth, (req, res) => {
    usersController.findAll(req, res);
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

  router.delete('/:id', auth, (req, res) => {
    usersController.delete(req, res);
  });

  return router;
};