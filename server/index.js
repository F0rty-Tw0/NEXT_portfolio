// const { createServer } = require('http');
// const { parse } = require('url');
const next = require('next');
const routes = require('../routes');
const express = require('express');

//Service
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const secretData = [
	{
		title: 'Secret Data',
		description: 'Stealing NASA codes'
	},
	{
		title: 'Secret Passwords',
		description: 'You would never get them'
	}
];

// app.prepare().then(() => {
// 	createServer((req, res) => {
// 		// Be sure to pass `true` as the second argument to `url.parse`.
// 		// This tells it to parse the query portion of the URL.
// 		const parsedUrl = parse(req.url, true);
// 		const { pathname, query } = parsedUrl;

// 		if (pathname === '/a') {
// 			app.render(req, res, '/a', query);
// 		} else if (pathname === '/b') {
// 			app.render(req, res, '/b', query);
// 		} else {
// 			handle(req, res, parsedUrl);
// 		}
// 	}).listen(3000, (err) => {
// 		if (err) throw err;
// 		console.log('> Ready on http://localhost:3000');
// 	});
// });

app
	.prepare()
	.then(() => {
		const server = express();

		//Route handler with Middleware validity of the token
		server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
			return res.json(secretData);
		});

		//Route handler with Middleware request user
		server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
			return res.json(secretData);
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		//Authorization Error handler
		server.use(function(err, req, res, next) {
			if (err.name === 'UnauthorizedError') {
				res.status(401).send({
					title: 'Unauthorized',
					detail: 'Unauthorized Access'
				});
			}
		});

		server.use(handle).listen(3000, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
