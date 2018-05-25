import React, {Component} from "react"
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"


import Home from "./home"
import Journeys from "./journeys"
import Journey from "./journey"
import JourneyDesign from "./journey-design"

export default function () {
	return (<section className="app-body">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/journeys" component={Journeys} />
					<Route path="/journey" component={Journey} />
					<Route path="/journey-design" component={JourneyDesign} />
				</Switch>
			</section>);
}