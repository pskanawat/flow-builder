import React, {Component} from "react"

import "./app.css"

import Header from "./components/header"
import Content from "./components/content"

export default class App extends Component {
	constructor(props) {
		super(props);
		this.displayName = "SVGComponent";
	}
	render() {
		return (
			<div className="app-wrapper">
				<Header />			
				<Content />
			</div>
			);
	}
}