const sendMail = require('./mailer');

module.exports = {

  sendRecipeValidation: function (recipe, dest) {
    sendMail('newRecipe', recipe, dest);
  }
};