/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const configTranspile = require('./webpack.babel');
const configLinter = require('./webpack.eslint');
const configStyles = require('./webpack.styles');

// Set to true if jquery is used
const INCLUDE_JQUERY = false;

module.exports = (PRODUCTION, base) => {

  const config = {
    target: 'web',
    entry: {
      index: path.resolve(`public/js/${base}App.js`),
    },
    output: {
      path: path.resolve('dist', base),
      filename: '[name].js'
    },
    module: {
      rules: [
        configLinter,
        configTranspile(PRODUCTION, 'public'),
        configStyles(PRODUCTION),
        {
          test: /\.(jpe?g|gif|png|svg|woff|woff2|ttf|eot|wav|mp3|ico|pdf)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1
            }
          }]
        }, {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: PRODUCTION
            }
          }]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(PRODUCTION)
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(`public/${base}.html`),
        favicon: path.resolve('public/favicon.ico')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({
          resource
        }) => /node_modules/.test(resource)
      }),
      new CopyWebpackPlugin([{
        from: path.resolve('public/externals/*'),
        flatten: true
      }, {
        from: path.resolve('node_modules/js-marker-clusterer/images/m*.png'),
        flatten: true,
        to: 'images'
      }])
    ],
    devtool: PRODUCTION ? 'none' : 'inline-source-map'
  };

  if (PRODUCTION) {
    config.plugins.push(new MinifyPlugin());
  }

  if (INCLUDE_JQUERY) {
    config.plugins.push(new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      $: 'jquery'
    }));
  }

  return config;
};