'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      name: 'Entrée',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Poisson',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Viande',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Dessert',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
