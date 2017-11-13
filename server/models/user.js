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
  }, {
    hooks: {
      beforeCreate: function (e, fn) {
        console.log('beforeCreate');
      },
      beforeBulkCreate: function (e, fn) {
        console.log('beforeBulkCreate');
      },
    }
  });

  User.associate = (models) => {};

  /**
   * Callback used to suppress password of found objects
   */
  User.beforeFind((options) => {
    if (!options.keepPassword) {
      return excludePassword(options);
    }
  });

  /**
   * Activates the beforeUpdate callback
   */
  User.beforeBulkUpdate((options) => {
    options.individualHooks = true;
  });
  User.beforeBulkCreate((options) => {
    options.individualHooks = true;
  });

  /**
   * Call user object sanitization before updating it into db
   */
  User.beforeUpdate((user, options) => {
    return sanitize(user);
  });

  /**
   * Call user object sanitization before creating it into db
   */
  User.beforeCreate((user, options) => {
    return sanitize(user);
  });

  /**
   * Delete password field from the newlly created user before
   * sending it back to the caller
   */
  User.afterCreate((user, options) => {
    user.password = undefined;
  });

  /**
   * User authentication method: verify that the given string password 
   * match the user encrypted one
   * @param {*} password The clear string password
   * @return {*}
   */
  User.prototype.authenticate = function (password) {
    let user = this;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          resolve(user.generateJWT());
        } else {
          reject(false);
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
  User.prototype.generateJWT = function () {
    return jwt.sign({
      id: this.id,
      name: this.name,
      isAdmin: this.isAdmin
    },
    config.jwtSecret, {
      expiresIn: '1h'
    });
  };

  /**
   * Disable password retrieval for all find requests
   * @param {*} options The options object given to the before callbacks
   * @return {*}
   */
  excludePassword = function (options) {
    if (typeof options.attributes === 'undefined') {
      options.attributes = {};
    }
    options.attributes.exclude = ['password'];
    return options;
  };

  /**
   * Do some user object sanitization before storing it in db
   * @param {*} user The user object beeing stored
   * @return {*}
   */
  sanitize = function (user) {
    user.email = user.email.toLowerCase();
    if (user.password) {
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
  };

  return User;
};