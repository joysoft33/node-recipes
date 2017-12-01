export default categoriesService;

/**
 * The categories service
 * @param {*} $resource
 * @param {*} Upload
 * @return {*}
 */
function categoriesService($resource) {
  'ngInject';

  return $resource('/api/categories/:id', {
    id: '@id'
  });
}