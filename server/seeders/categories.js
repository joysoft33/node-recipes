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
    return new Promise((resolve, reject) => {
      queryInterface.bulkDelete('categories').then(() => {
        return queryInterface.sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1');
      }).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
};
