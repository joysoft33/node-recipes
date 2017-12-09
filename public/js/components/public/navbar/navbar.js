import imgLogo from '../../../../images/logo.png';
import htmlTemplate from './navbar.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  controller: function controller(CONSTANTS, $log, $cookies, $translate, $window) {
    'ngInject';

    this.$onInit = () => {

      this.options = {};

      const options = $cookies.getObject(CONSTANTS.COOKIE);
      if (options && typeof options === 'object') {
        $translate.use(options.lang);
        this.options = options;
      }
      this.options.lang = $translate.use();

      this.images = {
        imgLogo
      };
    };

    this.setLanguage = (code) => {
      $translate.use(code);
      this.options.lang = $translate.use();
      $cookies.putObject(CONSTANTS.COOKIE, this.options);
    };

    this.admin = () => {
      $window.location = '/admin';
    };
  }
};