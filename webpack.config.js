var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './frontend/medium.jsx',
    // ['./frontend/medium.jsx',
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server'
    // ],
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  resolve: {
    extensions: ["", ".coffee", ".js", ".jsx", ".cjsx" ]
  },
  module: {
    noParse: /node_modules\/quill\/dist/,
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ["react"]
        }
      },
      { test: /\.cjsx$/, loaders: ["coffee-loader", "cjsx"]},
      { test: /\.coffee$/, loader: "coffee-loader"},
      { test: /(\.scss|\.css)$/, loaders: [ require.resolve('style-loader'), require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', require.resolve('sass-loader') + '?sourceMap' ] }  
    ],
  },
  devtool: 'source-maps',
  plugins: [
    new webpack.ProvidePlugin({
      'React':'react'
    })
    // ,new webpack.HotModuleReplacementPlugin()
  ]
}