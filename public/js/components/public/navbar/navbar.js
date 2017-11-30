import htmlTemplate from './navbar.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  controller: function controller(CONSTANTS, $log, $cookies, $translate) {
    'ngInject';

    this.$onInit = () => {
      const lang = $cookies.get(CONSTANTS.COOKIE);
      if (lang) {
        $translate.use(lang);
        this.lang = lang;
      } else {
        this.lang = $translate.use();
      }
    };

    this.setLanguage = (code) => {
      $translate.use(code);
      this.lang = $translate.use();
      $cookies.put(CONSTANTS.COOKIE, this.lang);
    };
  }
};