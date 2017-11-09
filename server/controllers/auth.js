const models = require('../models');

module.exports = class {

  /**
   * Authenticate a user given its email and password found and the request body
   * @param {*} req 
   * @param {*} res 
   */
  authenticate(req, res) {
    // First retrieve the user given its email address, do not hide password
    models.user.findOne({
      email: req.body.email,
      keepPassword: true
    }).then((user) => {
      // We are checking if password is the same as the one stored and encrypted in db
      return user.authenticate(req.body.password);
    }).then((token) => {
      // The returned value upon success is a new JWT token
      res.json({
        token: token
      });
    }).catch((err) => {
      res.sendStatus(401);
    });
  }

};