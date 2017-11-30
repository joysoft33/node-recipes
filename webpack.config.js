const PRODUCTION = process.env.NODE_ENV === 'production';

const serverConfig = require('./webpack/webpack.back');
const frontConfig = require('./webpack/webpack.front');

// Notice that both configurations are exported
module.exports = [
  serverConfig(PRODUCTION, 'server'),
  frontConfig(PRODUCTION, 'public'),
  frontConfig(PRODUCTION, 'admin')
];