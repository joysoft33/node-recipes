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
    from: config.mail.adminEmail
  },
  views: {
    root: path.join(config.serverPath, 'emails'),
    options: {
      extension: 'ejs'
    }
  },
  transport: transporter
});

module.exports = (template, data, dest) => {
  return email.send({
    template: template,
    message: {
      to: dest ? dest : config.mail.adminEmail
    },
    locals: {
      title: recipe.title,
      description: recipe.description
    }
  });
};