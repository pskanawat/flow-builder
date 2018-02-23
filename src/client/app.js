import React, {Component} from "react";
import ElementContainer from "./components/element-container.js";
//import DesignerContainer from "./components/designer-container";
import Designer from "./components/designer";

import "./app.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.displayName = "SVGComponent";
	}
	render() {
		return (
			<div className="app-wrapper">
				<header className="app-header"></header>
				<section className="app-body">
					<ElementContainer/>
					<Designer width="3000" height="1200"/>
				</section>
			</div>
			);
	}
}