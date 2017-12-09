export default usersService;

/**
 * The users service
 * @param {*} $resource
 * @return {*}
 */
function usersService($resource) {
  'ngInject';

  return $resource('/api/users/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}