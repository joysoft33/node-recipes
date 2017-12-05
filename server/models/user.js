const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config')();

// For password encryption
const SALT_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = function associate(models) {
    User.hasMany(models.recipe);
  };

  /**
   * Callback used to suppress password of found objects
   */
  User.beforeFind((options) => {
    if (!options.keepPassword) {
      return excludePassword(options);
    }
  });

  /**
   * Call user object sanitization before updating it into db
   */
  User.beforeUpdate(sanitize);
  User.beforeCreate(sanitize);

  /**
   * Delete password field from the user object before sending it back to the caller
   */
  User.afterUpdate(emptyPassword);
  User.afterCreate(emptyPassword);

  /**
   * User authentication method: verify that the given string password
   * match the user encrypted one
   * @param {*} password The clear string password
   * @return {*}
   */
  User.prototype.authenticate = function authenticate(password) {
    const user = this;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          resolve(user.generateJWT());
        } else {
          reject(Error('Bad credentials'));
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };

  /**
   * Generate a new authentication token for this user
   * @return {*} A JWT containing some usefull but not sensitive user info
   */
  User.prototype.generateJWT = function generateJWT() {
    const payload = {
      id: this.id,
      name: this.name,
      isAdmin: this.isAdmin
    };
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: '1h'
    });
  };

  /**
   * Disable password retrieval for all find requests
   * @param {*} options The options object given to the before callbacks
   * @return {*}
   */
  function excludePassword(options) {
    if (typeof options.attributes === 'undefined') {
      options.attributes = {};
    }
    options.attributes.exclude = ['password'];
    return options;
  }

  /**
   * Sanitize the given user object before storing it into db
   * @param {*} user
   * @return {*}
   */
  function sanitize(user) {
    user.email = user.email.toLowerCase();
    return user.password ? changePassword(user) : null;
  }

  /**
   * Delete the password field before sending user back
   * @param {*} user
   */
  function emptyPassword(user) {
    user.password = undefined;
  }

  /**
   * Do some user object sanitization before storing it in db
   * @param {*} user The user object beeing stored
   * @return {*}
   */
  function changePassword(user) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          user.password = hash;
          resolve(user);
        }
      });
    });
  }

  return User;
};