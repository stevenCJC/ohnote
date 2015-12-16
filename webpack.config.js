var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
	chunkFilename: '[id].chunk.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
			test: /\.(js|jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
			query: {
				stage: 0,
				optional: ['runtime'],
			},
		}
    ]
  }
}


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.

