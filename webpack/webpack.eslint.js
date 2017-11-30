module.exports = {
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