/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (PRODUCTION) => {

  const config = {
    test: /\.(s?css|sass)$/,
    use: [
      PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'sass-loader'
    ]
  };

  return config;
};