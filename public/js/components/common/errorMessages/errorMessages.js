import htmlTemplate from './errorMessages.html';

export default {

  template: htmlTemplate,

  bindings: {
    form: '<',
    field: '@'
  }
};