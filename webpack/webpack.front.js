/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: PRODUCTION ? '[name].[hash].css' : '[name].css'
      }),
      new webpack.DefinePlugin({
        'process.env.PRODUCTION': JSON.stringify(PRODUCTION)
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(`public/${base}.html`),
        favicon: path.resolve('public/favicon.ico')
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
    devtool: PRODUCTION ? 'source-map' : 'inline-source-map'
  };

  if (INCLUDE_JQUERY) {
    config.plugins.push(new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      $: 'jquery'
    }));
  }

  if (PRODUCTION) {
    config.optimization.minimizer = [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

  return config;
};