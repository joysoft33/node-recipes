/**
 * Common routes
 */
export default [{
  name: 'main',
  component: 'main',
  abstract: true,
  resolve: {
    loggedUser: ['AuthService', (AuthService) => {
      return AuthService.getUser();
    }]
  }
}, {
  name: 'main.login',
  url: '/login?redirect',
  component: 'login',
  resolve: {
    redirect: ['$transition$', ($transition$) => {
      return $transition$.params().redirect;
    }]
  }
}, {
  name: 'main.error',
  url: '/error?message&status',
  component: 'error',
  resolve: {
    error: ['$transition$', ($transition$) => {
      const params = $transition$.params();
      return {
        message: params.message,
        status: params.status
      };
    }]
  }
}];