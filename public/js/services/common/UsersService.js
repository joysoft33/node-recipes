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
    },
    findAround: {
      url: '/api/users/around',
      method: 'GET',
      isArray: true
    }
  });
}