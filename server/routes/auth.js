const AuthController = require('../controllers/auth');

module.exports = (express, auth) => {

  const authController = new AuthController;
  const router = express.Router();

  router.post('/', (req, res) => {
    authController.authenticate(req, res);
  });

  return router;
};