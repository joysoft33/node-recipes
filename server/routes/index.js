const jwtExpress = require('express-jwt');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const recipesRoutes = require('./recipes');
const categoriesRoutes = require('./categories');

const config = require('../config')();

let authCheck = jwtExpress({
  secret: config.jwtSecret,
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
  }
});

module.exports = (app, express) => {

  app.use('/auth', authRoutes(express));
  app.use('/users', usersRoutes(express, authCheck));
  app.use('/recipes', recipesRoutes(express, authCheck));
  app.use('/categories', categoriesRoutes(express, authCheck));

  // Set default error handler
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });
};