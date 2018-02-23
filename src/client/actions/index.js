let nextNodeId = 0;
const colors = ["#673AB7", "#3F51B5", "#2196F3", "#E91E63", "#FF9800", "#4CAF50"]
export const addNode = title => {
	return {
		id: "u-node-id-"+(nextNodeId++),
		x: Math.ceil(Math.random()*100),
		y: Math.ceil(Math.random()*100),
		width: 100,
		height: 50,
		fill: colors[Math.floor(Math.random()*6)]
	}
}