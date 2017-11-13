'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'john@free.fr',
      password: 'toto',
      name: 'John Doe',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'admin@free.fr',
      password: 'admin',
      name: 'Admin',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
