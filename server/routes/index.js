const jwtExpress = require('express-jwt');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const recipesRoutes = require('./recipes');
const categoriesRoutes = require('./categories');

const config = require('../config')();

/**
 * Build the authentication middleware object.
 * JWT will be found in the request authorization header.
 */
const authCheck = jwtExpress({
  secret: config.jwtSecret
});

module.exports = (app, express) => {

  app.use('/auth', authRoutes(express));
  app.use('/users', usersRoutes(express, authCheck));
  app.use('/recipes', recipesRoutes(express, authCheck));
  app.use('/categories', categoriesRoutes(express, authCheck));

  /**
   * The default error handler when all route matching has failed
   */
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
        message: 'No token provided.',
        success: false
      });
    }
  });
};