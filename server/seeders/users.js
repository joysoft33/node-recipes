const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const password = bcrypt.hashSync('toto', 10);

    return queryInterface.bulkInsert('users', [{
      email: 'user@free.fr',
      password: password,
      name: 'User',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'admin@free.fr',
      password: password,
      name: 'Admin',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      queryInterface.bulkDelete('users').then(() => {
        return queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');
      }).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
};
