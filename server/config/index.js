const dbConfig = require('./config.json');

// Retrieve env variables from .env file if present
require('dotenv').config();

const settings = {
  serverPort: process.env.PORT || 3000,
  imagesPath: 'images',
  basePath: '',
  mail: {
    host: process.env.MAIL_HOST || 'mailtrap.io',
    port: process.env.MAIL_PORT || 2525,
    secure: process.env.MAIL_SSL || false,
    user: process.env.MAIL_USER || '',
    passwd: process.env.MAIL_PASSWORD || '',
    adminEmail: process.env.MAIL_ADMIN || 'admin@recipes.fr'
  },
  jwtCookie: 'recipes',
  jwtSecret: process.env.JWTSECRET,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUDNAME,
    apiKey: process.env.CLOUDINARY_APIKEY,
    apiSecret: process.env.CLOUDINARY_APISECRET
  }
};

module.exports = (basePath) => {

  if (basePath) {
    // Read the sequelize config file
    settings.env = process.env.NODE_ENV || 'development';
    const dbSettings = dbConfig[settings.env];

    // Build the base front directory path
    settings.serverPath = basePath;

    // Extend base config with database one
    for (const key in dbSettings) {
      if (dbSettings.hasOwnProperty(key)) {
        settings[key] = dbSettings[key];
      }
    }
  }

  return settings;
};