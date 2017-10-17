const nodemailer = require('nodemailer');
const Email = require('email-templates');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '7f92fd987ccfce',
    pass: 'c5f2b44a229634'
  }
});

// Create a new template
const email = new Email({
  message: {
    from: 'toto@wildcodeschool.fr'
  },
  views: {
    options: {
      extension: 'ejs'
    }
  },
  transport: transporter
});

module.exports = (recipe) => {
  return email.send({
    template: 'newRecipe',
    message: {
      to: 'lulu@free.fr'
    },
    locals: {
      title: recipe.title,
      description: recipe.description
    }
  });
};