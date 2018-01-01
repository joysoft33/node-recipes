const ServerError = require('../utilities/errors');
const mails = require('../utilities/mails');
const models = require('../models');

module.exports = class {

  /**
   * Authenticate a user given its email and password found and the request body
   * @param {*} req
   * @param {*} res
   */
  authenticate(req, res, next) {
    // First retrieve the user given its email address, do not hide password
    models.user.findOne({
      where: {
        email: req.body.email
      },
      keepPassword: true
    }).then((user) => {
      if (!user) {
        throw new ServerError(404, 'Invalid credential supplied');
      }
      // Now check if password is the same as the one stored and encrypted in db
      return user.authenticate(req.body.password);
    }).then((token) => {
      // The returned value upon success is a new JWT token
      res.json({
        token: token
      });
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Start password recovery process
   * @param {*} req
   * @param {*} res
   */
  lostPassword(req, res, next) {
    // First retrieve the user given its email address
    models.user.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) {
        throw new ServerError(404, 'Invalid credential supplied');
      }
      const token = user.generateJWT();
      const url = `${req.headers.origin}/resetPassword?token=${token}`;
      // Send reset password email to the user
      mails.sendLostPassword(url, user.email);
      res.sendStatus(200);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * Save new user password
   * @param {*} req
   * @param {*} res
   */
  resetPassword(req, res, next) {
    // First retrieve the user given its email address
    models.user.findById(req.user.id).then((user) => {
      if (!user) {
        throw new ServerError(404, 'Invalid credential supplied');
      }
      // Change the user passowrd
      return user.updateAttributes({
        password: req.body.password
      });
    }).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      next(err);
    });
  }
};