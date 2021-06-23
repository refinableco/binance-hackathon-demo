const CracoLessPlugin = require('craco-less');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						relativeUrls: false,
						modifyVars: {
							'border-radius-base': '3px',
							'@input-height-sm': '45px',
							'@input-height-base': '45px'
						},
						javascriptEnabled: true
					}
				}
			}
		}
	],
	module: {
		rules: [
			{
				test: /\.(jsx|tsx|js|ts)$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [tsImportPluginFactory(/** options */)]
					}),
					compilerOptions: {
						module: 'es2015'
					}
				},
				exclude: /node_modules/
			}
		]
	}
};
