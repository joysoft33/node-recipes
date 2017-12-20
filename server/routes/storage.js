const StorageController = require('../controllers/storage');

module.exports = (express, auth) => {

  const storageController = new StorageController();
  const router = express.Router();

  router.post('/presign', auth.user, (req, res, next) => {
    storageController.presign(req, res, next);
  });

  router.delete('/image/:id', auth.user, (req, res, next) => {
    storageController.delete(req, res, next);
  });

  return router;
};