var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './frontend/medium.jsx',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  resolve: {
    extensions: ["", ".scss", ".coffee", ".js", ".jsx" ]
  },
  module: {
    noParse: /node_modules\/quill\/dist/,
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader"},
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /(\.scss|\.css)$/, loaders: 
          [ 
            require.resolve('style-loader'), 
            require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 
            require.resolve('sass-loader') + '?sourceMap' 
          ] 
      }  
    ],
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new webpack.ProvidePlugin({'React':'react'})
  ]
}