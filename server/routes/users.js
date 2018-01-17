const UserController = require('../controllers/users');

module.exports = (express, auth) => {

  const usersController = new UserController();
  const router = express.Router();

  router.get('/', auth.admin, (req, res, next) => {
    usersController.findAll(req, res, next);
  });

  router.get('/around', auth.admin, (req, res, next) => {
    usersController.findAround(req, res, next);
  });

  router.get('/:id', auth.user, (req, res, next) => {
    usersController.findOne(req, res, next);
  });

  router.post('/', (req, res, next) => {
    usersController.create(req, res, next);
  });

  router.put('/:id', auth.user, (req, res, next) => {
    usersController.update(req, res, next);
  });

  router.delete('/:id', auth.admin, (req, res, next) => {
    usersController.delete(req, res, next);
  });

  return router;
};