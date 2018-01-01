const sendMail = require('./mailer');

module.exports = {

  sendRecipeValidation: function sendRecipeValidation(recipe, dest) {
    return sendMail('newRecipe', recipe, dest);
  },

  sendLostPassword: function sendLostPassword(url, dest) {
    return sendMail('lostPassword', { url }, dest);
  }
};