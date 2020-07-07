const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		config.plugins.push(new Dotenv({ silent: true }));
		return config;
	},
	env: {
		AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
		AUTH0_REDIRECT_LOGIN: process.env.AUTH0_REDIRECT_LOGIN
	}
};
