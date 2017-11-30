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
          ['es2015'],
          ['env', {
            targets: targets,
            modules: false,
            debug: false
          }]
        ]
      }
    }]
  };

  if (server) {
    config.exclude = /node_modules/;
  } else {
    config.include = path.resolve(base);
    config.use.splice(0, 0, {
      loader: 'ng-annotate-loader'
    });
    config.use[1].options.presets.push(['angular']);
  }

  return config;
};