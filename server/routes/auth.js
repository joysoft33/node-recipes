const AuthController = require('../controllers/auth');

module.exports = (express, auth) => {

  const authController = new AuthController();
  const router = express.Router();

  router.post('/', (req, res, next) => {
    authController.authenticate(req, res, next);
  });

  router.post('/presign', auth.user, (req, res, next) => {
    authController.presign(req, res, next);
  });

  return router;
};