const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

const config = require('../config')();

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

// Create the email template object
const email = new Email({
  transport: transporter,
  message: {
    from: config.mail.adminEmail
  },
  views: {
    root: path.join(config.serverPath, 'emails'),
    options: {
      extension: 'ejs'
    }
  }
});

module.exports = (template, data, dest) => {
  return email.send({
    template: template,
    message: {
      to: dest || config.mail.adminEmail
    },
    locals: data
  });
};