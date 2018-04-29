const path = require('path');

module.exports = (PRODUCTION, base) => {

  const server = base === 'server';
  const targets = {};

  if (server) {
    targets.node = 'current';
  } else {
    targets.browsers = ['> 5%', 'last 2 versions'];
  }

  const config = {
    test: /\.js$/,
    include: path.resolve(base),
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            targets: targets,
            modules: false,
            debug: false
          }]
        ],
        plugins: [
        ]
      }
    }]
  };

  if (server) {
    config.exclude = /node_modules/;
  } else {
    config.include = path.resolve(base);
    config.use[0].options.presets.push(['angular']);
    config.use[0].options.plugins.push(['angularjs-annotate']);
  }

  return config;
};