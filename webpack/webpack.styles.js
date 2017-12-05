/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (PRODUCTION) => {

  const config = {
    test: /\.(s?css|sass)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          minimize: PRODUCTION
        }
      }, {
        loader: 'sass-loader'
      }]
    })
  };

  return config;
};