/**
 * Admin routes
 */
export default [{
  name: 'main.users',
  url: '/users',
  component: 'usersList',
  resolve: {
    users: (UsersService) => {
      return UsersService.query().$promise;
    }
  },
  data: {
    requiresLogin: true,
    defaultRoute: true
  }
}, {
  name: 'main.user',
  url: '/users/:id',
  component: 'userEdit',
  resolve: {
    user: (UsersService, $transition$) => {
      return UsersService.get({
        id: $transition$.params().id
      }).$promise;
    }
  },
  data: {
    requiresLogin: true
  }
}];