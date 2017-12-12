export default recipesService;

/**
 * The recipes service
 * @param {*} $resource
 * @param {*} $q
 * @param {*} Upload
 * @return {*}
 */
function recipesService($resource) {
  'ngInject';

  const Recipe = $resource('/api/recipes/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    },
    queryPaginated: {
      method: 'GET',
      array: true
    }
  });

  return Recipe;
}