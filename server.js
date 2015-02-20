var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

if (process.env.NODE_ENV === "heroku") {
  var serveStatic = require('serve-static');
  var finalhandler = require('finalhandler')
  var http = require('http')
  var path = require('path')
  var cwd = path.dirname(__filename);
  var p = cwd+config.output.publicPath;
  var express = require('express')

  var app = express()
  app.use(serveStatic('.', {'index': ['index.html']}))
  app.listen(process.env.PORT || 3000)
} else {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(process.env.PORT || 3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
  });
}

