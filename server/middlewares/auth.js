const jwtExpress = require('express-jwt');
const config = require('../config')();

module.exports = {

  user: jwtExpress({
    secret: config.jwtSecret
  }),

  admin: jwtExpress({
    secret: function secretCallback(req, payload, done) {
      if (payload.isAdmin) {
        done(null, config.jwtSecret);
      } else {
        done(new Error('Not authorized'));
      }
    }
  })
};