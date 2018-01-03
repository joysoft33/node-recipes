/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const configTranspile = require('./webpack.babel');
const configLinter = require('./webpack.eslint');

module.exports = (PRODUCTION, base) => {

  const config = {
    target: 'node',
    node: {
      __dirname: false
    },
    entry: {
      server: path.resolve(`${base}/server.js`)
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js'
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        configLinter,
        configTranspile(PRODUCTION, base)
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        entryOnly: false,
        raw: true
      }),
      new CopyWebpackPlugin([{
        context: path.resolve(`${base}/emails`),
        from: '**/*',
        to: 'emails'
      }], {
        copyUnmodified: true
      }),
      new CopyWebpackPlugin([{
        from: path.resolve('public/cloudinary_cors.html')
      }])
    ],
    devtool: PRODUCTION ? 'none' : 'inline-source-map'
  };

  if (PRODUCTION) {
    config.plugins.push(new MinifyPlugin());
  }

  return config;
};