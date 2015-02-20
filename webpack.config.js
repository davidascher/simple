var webpack = require('webpack');
var port = process.env.PORT || 3000;

var plugins = [
  new webpack.NoErrorsPlugin()
];
var entry = [];
var loaders = [
  { test: /\.md$/, loaders: ['raw']},
  { test: /\.woff2$/, loaders: ['file']},
  { test: /\.woff$/, loaders: ['file']},
  { test: /\.eot$/, loaders: ['file']},
  { test: /\.ttf$/, loaders: ['file']},
  { test: /\.svg$/, loaders: ['file']},
  { test: /\.png$/, loaders: ['file']},
  { test: /\.gif$/, loaders: ['file']},
  { test: /\.css$/, loader: 'style-loader!css-loader'},
  { test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
]

if (process.env.NODE_ENV != "heroku") {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  entry = [
    'webpack-dev-server/client?http://localhost:'+port,
    'webpack/hot/only-dev-server',
    './scripts/index'
  ];
  loaders.push(
    { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ }
  );
  loaders.push(
    { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ }
  );
} else {
  entry = [
    './scripts/index'
  ];
  loaders.push(
    { test: /\.js$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }
    );
  loaders.push(
      { test: /\.jsx$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }
    );
}

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    path: __dirname + '/scripts/',
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.md']
  },
  module: {
    loaders: loaders
  }
};
