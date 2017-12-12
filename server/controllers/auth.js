const uuidv4 = require('uuid/v4');
const sha1 = require('sha1');

const ServerError = require('../utilities/errors');
const models = require('../models');

const config = require('../config')();

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
   * Presign for a Cloudinary upload
   * @param {*} req
   * @param {*} res
   */
  presign(req, res) {
    const result = {
      publicId: uuidv4(),
      timestamp: Date.now(),
      apiKey: config.cloudinary.apiKey,
      cloudName: config.cloudinary.cloudName,
      callback: `${req.headers.origin}/cloudinary_cors.html`,
    };
    const options = `timestamp=${result.timestamp}${config.cloudinary.apiSecret}`;
    result.signature = sha1(options);
    res.json(result);
  }

};