import React from "react";
import _ from "lodash";

import { select, selectAll } from 'd3-selection'
import { drag } from 'd3-drag'
import {event as currentEvent} from 'd3';

export default class FlowBuilder extends React.Component {
	constructor(props) {
		super(props);
		const data = {
			nodes: [
				{
					id: "node-1",
					x: 50,
					y: 50
				}, {
					id: "node-2",
					x: 250,
					y: 250	
				}, {
					id: "node-3",
					x: 450,
					y: 350	
				}, {
					id: "node-4",
					x: 150,
					y: 450	
				}
			],
			edges: [
				{
					id: "edge-1",
					source: "node-1",
					target: "node-2" 
				},
				{
					id: "edge-2",
					source: "node-2",
					target: "node-3" 
				},
				{
					id: "edge-3",
					source: "node-1",
					target: "node-3" 
				},
				{
					id: "edge-4",
					source: "node-1",
					target: "node-4" 
				}
			]

		}

		let nodePositions = _.reduce(data.nodes, (mapObj, node) => {
			mapObj[node.id] = {
				x: node.x,
				y: node.y
			}
			return mapObj;
		}, {});

		let nodeToEdgeMap = _.reduce(data.edges, (obj, edge) => {
			nodePositions[edge.source] = nodePositions[edge.source] || {};
			nodePositions[edge.source]["edges"] = nodePositions[edge.source]["edges"] || [];
			nodePositions[edge.source]["edges"].push(edge);
			nodePositions[edge.target] = nodePositions[edge.target] || {};
			nodePositions[edge.target]["edges"] = nodePositions[edge.target]["edges"] || [];
			nodePositions[edge.target]["edges"].push(edge)
		}, {});

		let initState = _.assign({}, data, 
			{ 
				nodeMap: nodePositions
			}, 
			{
				style: {
					"markerEnd": 'url("#end-arrow")'
				}
			}
		);

		this.state = initState;
		this.currentDiff = {
			x: 0,
			y: 0
		};
	}

	onDragStart(self) {
		let draggedElem = this;
		self.currentDiff = {
			x: currentEvent.x - +draggedElem.getAttribute("x"),
			y: currentEvent.y - +draggedElem.getAttribute("y")
		}
		console.log("currentEvent", currentEvent.x, currentEvent.y)
	}

	onDrag(self) {
		let draggedElem = this;
		console.log("Dragging", draggedElem);
		/**
		 * Finding Edges for moved node from state.
		 */
		let edges = self.state.nodeMap[draggedElem.dataset.id]["edges"];
		let drggedElemNewPos = {
			x: currentEvent.x - self.currentDiff.x,
			y: currentEvent.y - self.currentDiff.y
		}
		select(draggedElem).attr("x", drggedElemNewPos.x).attr("y", drggedElemNewPos.y);
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

	generatePathFromEdge(path, source, target) {
		if(source) {
			path = path.split(" ");
			path[1] = source.x
			path[2] = source.y
			return path.join(" ");
		} else {
			path = path.split(" ");
			path[3] = target.x
			path[4] = target.y
			return path.join(" ");
		}
	}

	generatePath(source, target) {
		return "M " + source.x + " " + source.y + " " + target.x + " " + target.y;
	}

	componentDidMount() {
		const dragFn = drag().on("start", _.partial(this.onDragStart, this)).on("drag", _.partial(this.onDrag, this));
		selectAll("rect").call(dragFn);
	}

	render() {
		return (
			<g>
				<defs>
					<marker id="end-arrow" viewBox="0 -5 10 10" refX="10" markerWidth="5" markerHeight="5" orient="auto">
						<path d="M0,-5L10,0L0,5"></path>
					</marker>
					<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
						<path d="M0,-5L10,0L0,5"></path>
					</marker>
				</defs>
				<g className="flow-group">
					{this.state.nodes.map((node) => <rect data-id={node.id} key={node.id} x={node.x} y={node.y} width="140" height="80"></rect>)}
					{this.state.edges.map((edge) => <path data-id={edge.id} key={edge.id} d={this.generatePath(this.state.nodeMap[edge.source], this.state.nodeMap[edge.target])} strokeWidth="2" stroke="#cfcfcf" style={this.state.style}></path>)}
				</g>
			</g>	
		);
	}
}