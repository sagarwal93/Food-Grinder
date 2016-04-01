var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    preLoaders: [{
      test: /(\.js$|\.jsx$)/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {test: /materialize-css\/dist\/js\/materialize\.js/, loader: 'imports?materializecss'},
    {test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000'}]
  },
  resolve: {
    alias: {
      materializecss: 'materialize-css/dist/css/materialize.css',
      materialize: 'materialize-css/dist/js/materialize.js'
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
