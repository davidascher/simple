var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname + '/scripts/',
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.md']
  },
  module: {
    loaders: [
      { test: /\.md$/, loaders: ['raw']},
      { test: /\.woff2$/, loaders: ['file']},
      { test: /\.woff$/, loaders: ['file']},
      { test: /\.eot$/, loaders: ['file']},
      { test: /\.ttf$/, loaders: ['file']},
      { test: /\.svg$/, loaders: ['file']},
      { test: /\.png$/, loaders: ['file']},
      { test: /\.gif$/, loaders: ['file']},
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
    ]
  }
};
