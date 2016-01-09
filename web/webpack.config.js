var path = require('path')
	var webpack = require('webpack')
	var ExtractTextPlugin = require('extract-text-webpack-plugin')
	var Clean = require('clean-webpack-plugin')
	var HtmlWebpackPlugin = require('html-webpack-plugin')

	const IS_PRD_MODE = true;

module.exports = {
	
	devtool: 'cheap-module-eval-source-map',
	entry : [
		'webpack-hot-middleware/client',
		'./index'
	],
	output : {
		path : path.join(__dirname, '../server/client'),
		filename : 'bundle.js',
		chunkFilename : '[id].chunk.js',
		publicPath : '/'
	},
	resolve : {
		extensions : ['', '.jsx', '.js'],
		alias: {
			utils: path.join(__dirname, '/utils'),
			style:path.join(__dirname, '/style'),
		}
	},
	module : {
		loaders : [{
				test : /\.(js|jsx)$/,
				exclude : /(node_modules)/,
				loader : 'babel',
				query : {
					stage : 0,
					optional : ['runtime'],
				},

			}, {
				test : /\.(css)$/,
				loader : "style!css"
			},, {
				test : /\.(less)$/,
				loader : "style!css!less"
			}, {
				test : /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
				loader : 'url-loader?limit=8192'
			}
		]
	},
	plugins : (function () {
		// 由于插件太多，所以通过IIFE方式返回
		const r = [];

		// 生成环境清空冗余文件
		if (IS_PRD_MODE) {
			// 清除上一版本带md5更名的文件
			r.push(new Clean(['build']));

			r.push(new webpack.BannerPlugin('Build at ' + new Date()));

			// 开启压缩
			r.push(new webpack.optimize.UglifyJsPlugin({
					minimize : true,
				}));
		}

		r.push(new webpack.optimize.CommonsChunkPlugin({
			name : "common",
			filename : "common.js",
			minChunks: 2,
		}));

		r.push(new ExtractTextPlugin('app.css'));

		r.push(new HtmlWebpackPlugin({
				title : 'OhNote',
				
				minify : {
					removeComments : IS_PRD_MODE, // 生产环境开启删除注释
					collapseWhitespace : IS_PRD_MODE, // 生产环境开启压缩
				},
				filename : 'index.html',
				inject : 'body',
				hash : !IS_PRD_MODE, // 开发环境添加query hash
				template : 'index.template.html',
			}));

		r.push(new webpack.HotModuleReplacementPlugin());
		r.push(new webpack.NoErrorsPlugin());
		return r;
	})(),
}

// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
