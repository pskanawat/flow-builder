let nextNodeId = 0;
const colors = ["#673AB7", "#3F51B5", "#2196F3", "#E91E63", "#FF9800", "#4CAF50"]
export const addNode = pos => {
	let nodeObj = {};
	nodeObj[`u-node-id-${nextNodeId++}`] = {
		...pos,
		width: 100,
		height: 50,
		fill: colors[Math.floor(Math.random()*6)]
	}
	return {
		type: "ADD_NODE",
		node: nodeObj
	}
}

export const addEdge = (source, target) => {
	console.log(source, target);
	return {
		type: "ADD_EDGE",
		edge: {
			id: `u-edge-id-${nextNodeId++}`,
			source: source,
			target: target
		}
	}
}