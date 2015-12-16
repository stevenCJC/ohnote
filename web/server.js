var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var path = require('path')

var app = new (require('express'))()
var port = 8041

var compiler = webpack(config);
var middleware=webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath });
app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.get("/*", function(req, res) {
	res.end(middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html')));
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
