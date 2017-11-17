export default categoriesService;

/**
 * The categories service
 * @param {*} $resource
 * @param {*} Upload
 * @return {*}
 */
function categoriesService($resource) {
  'ngInject';

  return $resource('/categories/:id', {
    id: '@id'
  });
}