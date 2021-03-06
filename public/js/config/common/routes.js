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
  url: '/login?redirect&params',
  component: 'login',
  resolve: {
    redirect: ['$transition$', ($transition$) => {
      return $transition$.params().redirect;
    }],
    params: ['$transition$', ($transition$) => {
      return $transition$.params().params;
    }]
  }
}, {
  name: 'main.lostPassword',
  url: '/lostPassword',
  component: 'lostPassword'
}, {
  name: 'main.resetPassword',
  url: '/resetPassword?token',
  component: 'resetPassword',
  resolve: {
    token: ['$transition$', ($transition$) => {
      return $transition$.params().token;
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