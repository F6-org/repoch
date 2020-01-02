var path = require('path');
module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	module: {
		rules: [
			{oneOf: [
				{
					test: /\.(js|jsx|mjs)$/,
					// include: [paths.appSrc, paths.framework, paths.appKits, paths.appCommon, paths.appStore],
					exclude: /node_modules/,
					loader: require.resolve('babel-loader'),
					options: {
						// plugins: ['transform-decorators-legacy'],
						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true
					}
				}
			]}
		]
	}
};  