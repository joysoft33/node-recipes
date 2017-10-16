'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipes', [{
      title: 'Tarte tatin',
      description: `C'est facile, il faut suivre la recette !!`,
      count: 8,
      image: 'http://static.750g.com/images/660-auto/39898dc80b66da51e5588af4579dae6a/tarte-tatin.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Flammenküche',
      description: `C'est facile, il faut suivre la recette !!`,
      count: 12,
      image: 'http://static.750g.com/images/auto-525/cc753ac6fa05bb0ce080a13b9108354f/la-tarte-flambee-ou-flammenkuche.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Brioche pur beurre',
      description: `C'est facile, il faut suivre la recette !!`,
      count: 10,
      image: 'http://static.750g.com/images/auto-427/66076445f031753c96a6ddb08707975f/brioche-pur-beurre-faite-maison.png',      
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Gâteau magique au chocolat',
      description: `C'est facile, il faut suivre la recette !!`,
      count: 6,
      image: 'http://static.750g.com/images/auto-427/1c46f134ba3c3d1e2dac7593a512ddc2/gateau-magique-au-chocolat.jpg',      
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recipes', null, {});
  }
};
