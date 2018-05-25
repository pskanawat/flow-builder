const express = require('express');
const path = require('path');

export default class WebServer {
	constructor() {
		this.app = express();
		this.app.use(express.static('dist/public'));
		this.app.get("/user", function(req, res) {
		  res.send(req.session.user);    // get user object
		})
		this.app.get("/token", function(req, res) {
		  res.send(req.session);    // get user object
		})
		this.app.get('*', function (request, response){
		  response.sendFile(process.env.PWD + "/dist/public/index.html");
		})
	}

	start(port) {
		this.port = port || 8000;
		return new Promise((resolve, reject) => {
			try {
				this.server = this.app.listen(this.port,resolve.bind(this, "Started"))
			} catch(e){
				console.error(e);
				reject(e);
			}
		});
	}

	stop() {
		return new Promise((resolve, reject) => {
			try {
				this.server.close(resolve.bind(this, "Stopped"));
			} catch(e) {
				console.error(e);
				reject(e)
			}
		});
	}

	addM(middleware) {
		this.app.use(middleware);
	}
}