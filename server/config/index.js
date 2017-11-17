const path = require('path');
const dbConfig = require('./config.json');

const settings = {
  serverPort: process.env.NODE_PORT || 3000,
  imagesPath: 'images',
  publicPath: '',
  basePath: '',
  mail: {
    host: 'mailtrap.io',
    port: 2525,
    secure: false,
    user: process.env.MAILTRAP_USER || '',
    passwd: process.env.MAILTRAP_PASSWORD || '',
    adminEmail: 'admin@recipes.fr'
  },
  jwtCookie: 'recipes',
  jwtSecret: '0123456789876543210'
};

module.exports = (basePath) => {

  if (basePath) {
    // Read the sequelize config file
    settings.env = process.env.NODE_ENV || 'development';
    const dbSettings = dbConfig[settings.env];

    // Build the base front directory path
    settings.publicPath = path.join(basePath, 'public');
    settings.serverPath = path.join(basePath, 'server');

    // Extend base config with database one
    for (const key in dbSettings) {
      if (dbSettings.hasOwnProperty(key)) {
        settings[key] = dbSettings[key];
      }
    }
  }

  return settings;
};