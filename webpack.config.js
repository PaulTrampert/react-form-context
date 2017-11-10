const webpack = require('webpack');
const path = require('path');
const {dependencies} = require('./package.json');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'sourcemap',
  stats: 'errors-only',
  entry: {
    'react-form-context': path.resolve(SRC, 'index.js')
  },
  output: {
    path: DIST,
    filename: '[name].js',
    library: 'reactValidator',
    libraryTarget: 'umd'
  },
  externals: Object.keys(dependencies),
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: SRC,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};