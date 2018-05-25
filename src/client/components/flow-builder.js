import React from "react";
import _ from "lodash";

import { select, selectAll } from 'd3-selection'
import { drag } from 'd3-drag'
import {event as currentEvent, mouse} from 'd3';
import Node from './node'
import NodeMulti from './node-multi'
import Edge from './edge'
import Navigator from './navigator'

export default class FlowBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.nextUniqueId = 0;
		this.onDrop = this.onDrop.bind(this);
		this.state = this.addNodeMap(props);

		this.uiState = {
			mouseOverNode: null,
			dimestion: {
				width: 100,
				height:100
			}
		}

		this.style = {
			"markerEnd": 'url("#end-arrow")'
		}
	}

	onNodeGroupDragStart(self) {
		let draggedElem = this;
	}

	onNodeGroupDrag(self, d, i) {
		let draggedElem = this;
		/**
		 * Finding Edges for moved node from state.
		 */
		//let edges = _.get(self.state, `nodeMap[${draggedElem.dataset.id}]["edges"]`, []);
		let drggedElemNewPos = {
			x: (+draggedElem.dataset.x) + currentEvent.dx,
			y: (+draggedElem.dataset.y) + currentEvent.dy
		}

		/*select(draggedElem).attr("transform", `translate(${drggedElemNewPos.x}, ${drggedElemNewPos.y})`)
			.attr("data-x",drggedElemNewPos.x)
			.attr("data-y",drggedElemNewPos.y);*/

		let newNode = {};
		newNode[draggedElem.dataset.id] = drggedElemNewPos;

		self.setState({
			nodes: {
				...self.state.nodes,
				...newNode
			}
		});
		
		/*edges.forEach((edge) => {
			let edgeElem = select("[data-id="+edge.id+"]");
			if(edge.source === draggedElem.dataset.id) {
				edgeElem.attr("d", self.generatePathFromEdge(edgeElem.attr("d"), drggedElemNewPos, null));
			} else {
				edgeElem.attr("d", self.generatePathFromEdge(edgeElem.attr("d"), null, drggedElemNewPos));
			}

		});*/
	}

	onNodeGroupDragEnd(self) {
		let draggedElem = this;
		if(typeof(self.props.updateNode) == "function") {
			self.props.updateNode(draggedElem.dataset.id, { x: +draggedElem.dataset.x, y: +draggedElem.dataset.y});
		} else {
			console.warn("Expects props.updateNodeState as a function in FlowBuilder");
		}
	}

	onPortDragStart() {
		currentEvent.sourceEvent.stopPropagation();
		console.log('Start Drawing Arraw');
	}
	onPortDrag(self) {
		let portGroup = this;
		let srcPos = {
			x: +portGroup.parentElement.dataset.x,
			y: +portGroup.parentElement.dataset.y
		}, targetPos = {
			x: srcPos.x + currentEvent.x - (self.uiState.dimestion.width/2),
			y: srcPos.y + currentEvent.y - (self.uiState.dimestion.height/2)
		}
		let {x1, y1, x2, y2} = self.getLineCord(srcPos, targetPos);
		select(".temp-path").attr("d", `M ${x1} ${y1} ${x2} ${y2}`)
	}

	onPortDragEnd(self) {
		let portGroup = this;
		//Not doing anything when dragged edge ends up no where.
		if(self.uiState.mouseOverNode) {		
			console.log("PORT Drag End",portGroup.parentElement.dataset.id, self.uiState.mouseOverNode.dataset.id)
			if(portGroup.parentElement.dataset.id !== self.uiState.mouseOverNode.dataset.id) {
				//TO DO: If the edge already exist for same src and target then skip
				self.addEdge(portGroup.parentElement.dataset.id, self.uiState.mouseOverNode.dataset.id);
			}
		}
		select(".temp-path").attr("d", "M 0 0 0 0");
	}

	generatePathFromEdge(path, source, target) {
		if(source) {
			path = path.split(" ");
			path[1] = +source.x+(this.uiState.dimestion.width/2)
			path[2] = +source.y+(this.uiState.dimestion.height/2)
			return path.join(" ");
		} else {
			path = path.split(" ");
			path[3] = +target.x+(this.uiState.dimestion.width/2)
			path[4] = +target.y+(this.uiState.dimestion.height/2)
			return path.join(" ");
		}
	}

	getLineCord(source, target) {
		return {
			x1: +source.x+ (this.uiState.dimestion.width/2),
			y1: +source.y+(this.uiState.dimestion.height/2),
			x2: +target.x+(this.uiState.dimestion.width/2),
			y2: +target.y+(this.uiState.dimestion.height/2)
		}
	}

	onMouseEvent(self, isMouseOver) {
		if(isMouseOver) {
			self.uiState.mouseOverNode = this;
		} else {
			self.uiState.mouseOverNode = null;
		}
	}

	componentDidMount() {
		this.attachEvents();
	}

	componentDidUpdate() {
		this.attachEvents();	
	}

	attachEvents() {
		let self = this;
		const dragFn = drag()
						.on("start", _.partial(this.onNodeGroupDragStart, this))
						.on("drag", _.partial(this.onNodeGroupDrag, this))
						.on("end", _.partial(this.onNodeGroupDragEnd, this));
		selectAll(".flow-group .node-group")
			.on("mouseover", _.partial(this.onMouseEvent, this, true))
			.on("mouseout", _.partial(this.onMouseEvent, this, false)).call(dragFn);
		const dragArrawFn = drag()
							.on("start", _.partial(this.onPortDragStart, this))
							.on("drag", _.partial(this.onPortDrag, this))
							.on("end", _.partial(this.onPortDragEnd, this));
		selectAll(".flow-group .port-group").call(dragArrawFn);


	}

	onDragOver(ev) {
		ev.preventDefault();
	}

	onDrop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		console.log(ev.clientX, ev.clientY);
		this.addNode(data, {
			x: ev.clientX - 257,
			y: ev.clientY - 51
		});
	}

	onDragEnd() {
		console.log("Drag End", arguments);
	}

	onNodeClick(ev) {
		let id = _.get(ev.target, "parentElement.dataset.id");
		this.props.onNodeClick && this.props.onNodeClick({id, ...this.state.nodeMap[id]})
	}

	addNode(data, pos) {
		let nodeObj = {};
		nodeObj[`fb-elem-id-${this.nextUniqueId++}`] = {
			...pos,
			width: this.uiState.dimestion.width,
			height: this.uiState.dimestion.height
		}

		let newState = Object.assign ({}, this.state, {
			nodes: {
				...this.state.nodes,
				...nodeObj
			}
		});

		this.setState(this.addNodeMap(newState));
		//this.props.onNodeAdd && this.props.onNodeAdd();
	}

	addEdge(src, tgt) {
		let newState = Object.assign ({}, this.state, {
			edges: [
				...this.state.edges,
				{
					id: `fb-elem-id-${this.nextUniqueId++}`,
					source: src,
					target: tgt
				}
			]
		});
		this.setState(this.addNodeMap(newState));
		//this.props.onAddEdge && this.props.onAddEdge();
	}

	deleteNode(ev) {
		let id = ev.currentTarget.parentElement.dataset.id;
		let deletedNode = {
			id: id,
			edges: this.state.nodeMap[id]["edges"]
		}
		let newState= Object.assign({}, this.state);
			delete newState.nodes[deletedNode.id];
			//Filter the Edges only when there are edges for the Node.
			if(deletedNode.edges){	
				newState.edges = newState.edges.filter((edge)=>{
					let ids = deletedNode.edges.map((edge)=>edge.id);
					return ids.indexOf(edge.id) == -1
				});
			}
		this.setState(this.addNodeMap(newState));
		//this.props.onNodeDelete && this.props.onNodeDelete();
	}

	deleteEdge(ev) {
		let id = ev.currentTarget.parentElement.dataset.id;
		let newState= Object.assign({}, this.state);
			newState.edges = newState.edges.filter((edge)=>{
				return edge.id !== id;
			});
		this.setState(this.addNodeMap(newState));
		//this.props.onEdgeDelete && this.props.onEdgeDelete();
	}

	addNodeMap(nextProps) {
		let props = nextProps ? nextProps: this.props;
		let nodeMap = _.reduce(props.nodes, (mapObj, node, key) => {
			mapObj[key] = {
				x: node.x,
				y: node.y
			}
			return mapObj;
		}, {});

		let nodeToEdgeMap = _.reduce(props.edges, (obj, edge) => {
			nodeMap[edge.source] = nodeMap[edge.source] || {};
			nodeMap[edge.source]["edges"] = nodeMap[edge.source]["edges"] || [];
			nodeMap[edge.source]["edges"].push(edge);
			nodeMap[edge.target] = nodeMap[edge.target] || {};
			nodeMap[edge.target]["edges"] = nodeMap[edge.target]["edges"] || [];
			nodeMap[edge.target]["edges"].push(edge)
		}, {});
		return {
			...props,
			nodeMap
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.addNodeMap(nextProps));
	}


	render() {
		return (
			<section className="designer-container">
				<svg width="1200" height="1200" onDrop={this.onDrop} onDragOver={this.onDragOver}>				
					<g>
						<defs>
							<marker id="end-arrow" viewBox="0 -5 10 10" refX="70" markerWidth="4" markerHeight="4" orient="auto">
								<path d="M0,-5L10,0L0,5" stroke="#e2e2e3" fill="#e2e2e3"></path>
							</marker>
							<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
								<path d="M0,-5L10,0L0,5"></path>
							</marker>
							<filter id="dropShadowv-21195304394" filterUnits="objectBoundingBox" x="-1" y="-1" width="3" height="3"><feDropShadow stdDeviation="1" dx="0" dy="1.35" floodColor="black" floodOpacity="0.2"></feDropShadow></filter>
						</defs>
						<g className="flow-group">
							<path className="temp-path" 
							data-id="temp-path" key="temp-path" d="M 0 0 0 0" strokeWidth="1" stroke="#e2e2e3" 
							style={this.style}></path>
							{this.state.edges.map((edge) => <Edge key={edge.id} 
								id={edge.id} {...this.getLineCord(this.state.nodes[edge.source], this.state.nodes[edge.target])} 
								onDelete={(ev)=>this.deleteEdge(ev)} />)}
							{_.map(this.state.nodes, 
								(node, id) => <Node key={id} id={id} 
								x={node.x} 
								y={node.y} 
								width={this.uiState.dimestion.width} 
								height={this.uiState.dimestion.height} 
								onClick={(ev) => this.onNodeClick(ev)} 
								onDelete={(ev)=>this.deleteNode(ev)} ports={5} />)}
						</g>
					</g>	
				</svg>
				<Navigator nodes={this.state.nodes} width={this.uiState.dimestion.width} height={this.uiState.dimestion.height} />
			</section>
		);
	}
}