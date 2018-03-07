import _ from "lodash"

const getData = () => {
	const data = {
			/*nodes: [
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
			],*/
			nodes: {
				"node-1": {
					x: 50,
					y: 50
				},
				"node-2": {
					x: 250,
					y: 250
				},
				"node-3": {
					x: 450,
					y: 350
				},
				"node-4": {
					x: 150,
					y: 450
				},
				"node-5": {
					x: 190,
					y: 250
				}
			},
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

		return data;
}

const updateNode =  (state, data) => {
	 state.nodes[data.id] = data.node;
	 return state;
}

const data = (state = getData(), action ) => {
	switch(action.type) {
		case 'ADD_NODE':
			return Object.assign({}, state, {
				nodes: {...state.nodes, ...action.node}
			});
		case 'ADD_EDGE':
			return Object.assign({}, state, {
				edges: [...state.edges, action.edge]
			});
		case 'DELETE_NODE':
			let newState= Object.assign({}, state);
			delete newState.nodes[action.node.id];
			newState.edges = newState.edges.filter((edge)=>{
				let ids = action.node.edges.map((edge)=>edge.id);
				return ids.indexOf(edge.id) == -1
			})
			return newState;
		case 'UPDATE_NODE':
			return updateNode(state, action)
		default:
			return state
	}
}

export default data;