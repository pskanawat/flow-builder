import WebServer from './web-server';

let webServer = new WebServer();

webServer
	.start()
		.then(() => {
			console.log("Web Server Started on ", webServer.port);
		})
		.catch((err) => {
			console.error("Failed to start the server.");
			console.error(err);
		});