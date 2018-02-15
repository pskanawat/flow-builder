import React from "react";
import { selectAll } from 'd3-selection'
import { drag } from 'd3-drag'
import FlowBuilder from "./flow-builder";

class Designer extends React.Component {
	constructor(props){
		super(props);
	}
	onDragOver(ev) {
		ev.preventDefault();
	}

	onDrop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		console.dir(data);
		//ev.target.appendChild(document.getElementById(data));
	}
	onDragStart() {
		console.log("Drag start", arguments);
	}

	onDrag(data) {
		//d3.event.sourceEvent.stopPropagation();
		console.log("Dragging", this);
	}

	onDragEnd() {
		console.log("Drag End", arguments);
	}

	componentDidMount() {
		const dragFn = drag().on("drag", this.onDrag);
		selectAll("rect").call(dragFn);
	}

	render() {
		return (
			<section className="designer-container">
				<svg width={this.props.width} height={this.props.height} onDrop={this.onDrop} onDragOver={this.onDragOver}>
					<FlowBuilder />
				</svg>
			</section>
		)
	}
}

export default Designer;