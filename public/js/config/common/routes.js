/**
 * Common routes
 */
export default [{
  name: 'main',
  url: '/',
  component: 'main',
  abstract: true,
  resolve: {
    loggedUser: (AuthService) => {
      return AuthService.getUser();
    }
  }
}, {
  name: 'main.login',
  url: 'login?redirect',
  component: 'login',
  resolve: {
    redirect: ($transition$) => {
      return $transition$.params().redirect;
    }
  }
}, {
  name: 'main.error',
  url: 'error?message&status',
  component: 'error',
  resolve: {
    error: ($transition$) => {
      const params = $transition$.params();
      return {
        message: params.message,
        status: params.status
      };
    }
  }
}];