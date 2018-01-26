const express = require('express');

export default class WebServer {
	constructor() {
		this.app = express();
		this.app.use(express.static('dist/public'));
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
}