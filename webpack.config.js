const webpack = require('webpack');
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  entry: [
    './public/index.js'
  ],
  output: {
    path: path.resolve(__dirname + '/public/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    devFlagPlugin
  ],
  devtool: 'sourcemaps',
  cache: true
};