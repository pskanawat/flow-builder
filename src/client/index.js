import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import journeyApp from './reducers'

import App from "./app";

let store = createStore(journeyApp, {}, window.devToolsExtension ? window.devToolsExtension() : f => f)


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app-container"));