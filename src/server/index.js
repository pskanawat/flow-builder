import WebServer from './web-server';

let webServer = new WebServer();
//let jwt = require('express-jwt');
//let Authn = require("authn-lib");
/*let authn = Authn({
  "clientId": "journey-ui",
  "clientSecret": "",  
  "authnUrl": "",
  "serviceUrl": "http://localhost:8000/",
  "callbackUrl": "/login_callback", //optional, default value /login_callback
  "logoutUrl": "/logout",           //optional, default value /logout 
  "authEnabled": true               //optional, default value true
});*/

/* initialize express app */

//webServer.addM(jwt({ secret: 'my-secret', requestProperty: "session"}).unless({path: ['/token']}));

//webServer.addM(authn.ensureAuthentictionFilter);
//webServer.addM(authn.callbackFilter);
//webServer.addM(authn.logoutFilter);

webServer
	.start()
		.then(() => {
			console.log("Web Server Started on ", webServer.port);
		})
		.catch((err) => {
			console.error("Failed to start the server.");
			console.error(err);
		});
