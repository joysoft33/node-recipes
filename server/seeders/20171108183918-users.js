'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'john@free.fr',
      password: 'toto',
      name: 'John Doe',
      isAdmin: false
    }, {
      email: 'admin@free.fr',
      password: 'admin',
      name: 'Admin',
      isAdmin: true
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
