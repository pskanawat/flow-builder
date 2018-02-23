import React from "react";
import _ from "lodash";

import { select, selectAll } from 'd3-selection'
import { drag } from 'd3-drag'
import {event as currentEvent} from 'd3';
import Node from './node'

export default class FlowBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.currentDiff = {
			x: 0,
			y: 0
		};
	}

	onNodeGroupDragStart(self) {
		let draggedElem = this;
		self.currentDiff = {
			x: currentEvent.x - +draggedElem.dataset.x,
			y: currentEvent.y - +draggedElem.dataset.y
		}
		console.log("currentEvent", currentEvent.x, currentEvent.y)
	}

	onNodeGroupDrag(self, d, i) {
		let draggedElem = this;
		console.log("Dragging", draggedElem);
		/**
		 * Finding Edges for moved node from state.
		 */
		let edges = _.get(self.props, `nodeMap[${draggedElem.dataset.id}]["edges"]`, []);
		let drggedElemNewPos = {
			x: currentEvent.x - self.currentDiff.x,
			y: currentEvent.y - self.currentDiff.y
		}
		select(draggedElem).attr("transform", `translate(${drggedElemNewPos.x}, ${drggedElemNewPos.y})`)
			.attr("data-x",drggedElemNewPos.x)
			.attr("data-y",drggedElemNewPos.y);
		edges.forEach((edge) => {
			let edgeElem = select("[data-id="+edge.id+"]");
			if(edge.source === draggedElem.dataset.id) {
				edgeElem.attr("d", self.generatePathFromEdge(edgeElem.attr("d"), drggedElemNewPos, null));
			} else {
				edgeElem.attr("d", self.generatePathFromEdge(edgeElem.attr("d"), null, drggedElemNewPos));
			}
		});
		console.log("currentEvent", currentEvent.x, currentEvent.y)
	}

	onPortDragStart() {
		currentEvent.sourceEvent.stopPropagation();
		console.log('Start Drawing Arraw');
	}
	onPortDrag(self) {
		let portGroup = this;
		console.log('Arraw', currentEvent.dx, currentEvent.dy);
		let srcPos = {
			x: +portGroup.parentElement.dataset.x,
			y: +portGroup.parentElement.dataset.y
		}, targetPos = {
			x: srcPos.x + currentEvent.x,
			y: srcPos.y + currentEvent.y
		}
		select(".temp-path").attr("d", self.generatePath(srcPos, targetPos))
	}

	connectNodes() {
		
	}

	generatePathFromEdge(path, source, target) {
		if(source) {
			path = path.split(" ");
			path[1] = +source.x+50
			path[2] = +source.y+25
			return path.join(" ");
		} else {
			path = path.split(" ");
			path[3] = +target.x+50
			path[4] = +target.y+25
			return path.join(" ");
		}
	}

	generatePath(source, target) {
		return "M " + (+source.x+50) + " " + (+source.y+25) + " " + (+target.x+50) + " " + (+target.y+25);
	}

	componentDidMount() {
		const dragFn = drag().on("start", _.partial(this.onNodeGroupDragStart, this)).on("drag", _.partial(this.onNodeGroupDrag, this));
		selectAll(".node-group").call(dragFn);
		const dragArrawFn = drag().on("start", _.partial(this.onPortDragStart, this)).on("drag", _.partial(this.onPortDrag, this));
		selectAll(".node-ports").call(dragArrawFn);
	}

	componentDidUpdate() {
		const dragFn = drag().on("start", _.partial(this.onNodeGroupDragStart, this)).on("drag", _.partial(this.onNodeGroupDrag, this));
		selectAll(".node-group").call(dragFn);
		const dragArrawFn = drag().on("start", _.partial(this.onPortDragStart, this)).on("drag", _.partial(this.onPortDrag, this));
		selectAll(".node-ports").call(dragArrawFn);
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

	onDragEnd() {
		console.log("Drag End", arguments);
	}

	onClick() {
		console.log("Clicked")
	}

	render() {
		return (
			<section className="designer-container">
				<svg width="1200" height="1200" onDrop={this.props.onNodeAdd} onDragOver={this.onDragOver}>				
					<g>
						<defs>
							<marker id="end-arrow" viewBox="0 -5 10 10" refX="70" markerWidth="4" markerHeight="4" orient="auto">
								<path d="M0,-5L10,0L0,5" stroke="#ccc" fill="#ccc"></path>
							</marker>
							<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
								<path d="M0,-5L10,0L0,5"></path>
							</marker>
						</defs>
						<g className="flow-group">
							<path className="temp-path" data-id="temp-path" key="temp-path" d="M 0 0 10 10" strokeWidth="3" stroke="#00ff00" style={this.props.style}></path>
							{this.props.edges.map((edge) => <path data-id={edge.id} key={edge.id} d={this.generatePath(this.props.nodeMap[edge.source], this.props.nodeMap[edge.target])} strokeWidth="3" stroke="#ccc" style={this.props.style}></path>)}
							{this.props.nodes.map((node) => <Node key={node.id} id={node.id} x={node.x} y={node.y} width={100} height={50} onClick={this.onClick} />)}
						</g>
					</g>	
				</svg>
			</section>
		);
	}
}