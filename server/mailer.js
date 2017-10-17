'use strict';

const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER || '',
    pass: process.env.MAILTRAP_PASSWORD || ''
  }
});

// Create a new template
const email = new Email({
  message: {
    from: 'toto@wildcodeschool.fr'
  },
  views: {
    root: path.join(__dirname, '/emails'),
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