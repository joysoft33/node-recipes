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
      default: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = (models) => {};

  User.beforeFind((options) => {
    if (!options.keepPassword) {
      return excludePassword(options);
    }
  });

  User.beforeBulkUpdate((options) => {
    options.individualHooks = true;
  });

  User.beforeUpdate((user, options) => {
    return changePassword(user);
  });

  User.beforeCreate((user, options) => {
    return changePassword(user);
  });

  User.afterCreate((user, options) => {
    delete user.password;
  });

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

  User.prototype.generateJWT = () => {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        isAdmin: this.isAdmin
      },
      config.jwtSecret, {
        expiresIn: '1h'
      });
  };

  excludePassword = function (options) {
    if (typeof options.attributes === 'undefined') {
      options.attributes = {};
    }
    options.attributes.exclude = ['password'];
    return options;
  };

  changePassword = function (user) {
    user.email = user.email.toLowerCase();
    if (user.password) {
      return new Promise((resolve, reject) => {
        bcrypt.hash(user.get('password'), SALT_FACTOR, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            user.set('password', hash);
            resolve(user);
          }
        });
      });
    }
  };

  return User;
};