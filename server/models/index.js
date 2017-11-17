const Sequelize = require('sequelize');
const config = require('../config')();

const modules = [
  require('./category.js'),
  require('./recipe.js'),
  require('./user.js')
];

let sequelize;
const db = {};

config.logging = false;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

modules.forEach((module) => {
  const model = module(sequelize, Sequelize);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;