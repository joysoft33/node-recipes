const AuthController = require('../controllers/auth');

module.exports = (express) => {

  const authController = new AuthController();
  const router = express.Router();

  router.post('/', (req, res, next) => {
    authController.authenticate(req, res, next);
  });

  return router;
};