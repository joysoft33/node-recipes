const sendMail = require('./mailer');

module.exports = {

  sendRecipeValidation: function sendRecipeValidation(recipe, dest) {
    return sendMail('newRecipe', recipe, dest);
  }
};