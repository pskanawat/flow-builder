import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import journeyApp from './reducers'
import { BrowserRouter as Router} from "react-router-dom"

import App from "./app";

let store = createStore(journeyApp, {}, window.devToolsExtension ? window.devToolsExtension() : f => f)


ReactDOM.render(
	<Router>		
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("app-container"));
/*if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('Service worker registration succeeded:', registration);
    }).catch(function(error) {
        console.info('Service worker registration failed:', error);
    });
} else {
    console.log('Service workers are not supported.');
}*/