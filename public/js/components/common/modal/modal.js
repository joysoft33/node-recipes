import htmlTemplate from './modal.html';

export default {

  template: htmlTemplate,

  bindings: {
    validate: '&',
    toggle: '='
  },

  transclude: {
    title: 'modalTitle',
    content: 'modalContent',
    cancel: 'modalCancel',
    ok: 'modalOk',
  },

  controller: function controller($log) {

    this.$onInit = () => {
      $log.info('Modal component init');
    };
  }
};