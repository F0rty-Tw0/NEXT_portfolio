const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');
const path = require('path');
module.exports = withCSS(
	withSass(),
	{
		/* config options here */
	}
);

module.exports = {
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		config.plugins.push(new Dotenv({ silent: true }));
		return config;
	}
};
