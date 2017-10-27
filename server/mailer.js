const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

const config = require('./config')();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.secure,
  auth: {
    user: config.mail.user,
    pass: config.mail.passwd
  }
});

// Create a new template
const email = new Email({
  message: {
    from: 'toto@wildcodeschool.fr'
  },
  views: {
    root: path.join(config.serverPath, 'emails'),
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