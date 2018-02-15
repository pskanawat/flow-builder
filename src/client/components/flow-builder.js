import React from "react";
import _ from "lodash";

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
				}
			],
			edges: [
				{
					id: "edge-1",
					source: "node-1",
					target: "node-2" 
				}
			]

		}

		const nodePositions = _.reduce(data.nodes, (mapObj, node) => {
			mapObj[node.id] = {
				x: node.x,
				y: node.y
			}
			return mapObj;
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
	}

	generatePath(source, target) {
		return "M " + source.x + " " + source.y + " " + target.x + " " + target.y;
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
					{this.state.nodes.map((node) => <rect key={node.id} x={node.x} y={node.y} width="100" height="70"></rect>)}
					{this.state.edges.map((edge) => <path key={edge.id} d={this.generatePath(this.state.nodeMap[edge.source], this.state.nodeMap[edge.target])} strokeWidth="2" stroke="#cfcfcf" style={this.state.style}></path>)}
				</g>
			</g>	
		);
	}
}