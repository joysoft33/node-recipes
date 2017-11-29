const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MinifyPlugin = require('babili-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Common options
 */
const linterConfig = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'eslint-loader',
    options: {
      failOnWarning: false,
      failOnError: true
    }
  }]
};

/**
 * Server (back) options
 */
const serverConfig = {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: {
    server: path.resolve('server.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      linterConfig,
      {
        test: /\.js$/,
        include: path.resolve('server'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015'],
              ['env', {
                targets: {
                  node: 'current'
                },
                modules: false,
                debug: false
              }]
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    PRODUCTION && new MinifyPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true
    }),
    new CopyWebpackPlugin([{
      context: path.resolve('server/emails'),
      from: '**/*',
      to: 'emails'
    }], {
      copyUnmodified: true
    })
  ].filter(e => e),
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map'
};

/**
 * Public (front) application options
 */
const publicConfig = {
  target: 'web',
  entry: {
    index: path.resolve('public/js/recipesApp.js')
  },
  output: {
    path: path.resolve('dist/public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      linterConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('public'),
        use: [{
          loader: 'ng-annotate-loader'
        }, {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015'],
              ['env', {
                targets: {
                  browsers: ['> 5%', 'last 2 versions']
                },
                modules: false,
                debug: false
              }],
              ['angular']
            ]
          }
        }]
      }, {
        test: /\.(jpe?g|gif|png|svg|woff|woff2|ttf|eot|wav|mp3|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1
          }
        }]
      }, {
        test: /\.s?css$/,
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
    PRODUCTION && new MinifyPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION)
    }),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('public/index.html'),
      favicon: path.resolve('public/favicon.ico')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({
        resource
      }) => /node_modules/.test(resource)
    })
  ].filter(e => e),
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map'
};

// Notice that both configurations are exported
module.exports = [serverConfig, publicConfig];