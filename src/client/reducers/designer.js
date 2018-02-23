import _ from "lodash"

const getData = () => {
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
				}, {
					id: "node-5",
					x: 190,
					y: 250	
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
				},
				{
					id: "edge-5",
					source: "node-4",
					target: "node-5" 
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
		return initState;
}

const data = (state = getData(), action ) => {
	switch(action.type) {
		case 'ADD_NODE':
			return Object.assign({}, state, {
				nodes: [
					...state.nodes,	
					action.node
				]
			});
		default:
			return state
	}
}

export default data;