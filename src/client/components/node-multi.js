import	React from 'react'
import PropTypes from 'prop-types'
import trashImg from '../images/trash.svg'

const NodeMulti = ({ x, y, id, width, height, onClick, onDelete, ports}) => {
	let portsArray = [];
	for (let i = 0; i < ports; i++) {
		let cx, cy;
		cx = 50 * Math.cos(i*360/ports);
		cy = 50 * Math.sin(i*360/ports);
		portsArray.push({cx, cy});
	}

	return (<g className="node-group" data-id={id} data-x={x} data-y={y} transform={`translate(${x}, ${y})`}>			
		<rect
			className="body"
			onClick={onClick}
			width={width}
			height={height}
			filter="url(#dropShadowv-21195304394)">
		</rect>
		<text className="node-title" x="0.8em" y="1.4em">
			<tspan> Node title </tspan>
		</text>
		<text className="node-id" x="0.8em" y={height-4}>
			<tspan>{id}</tspan>
		</text>
		<g className="port-group1" transform="translate(100, 50)">
			<circle r="50"></circle>
			{portsArray.map((port, i)=><circle key={i} data-id={i} cx={port.cx} cy={port.cy} r="5" fill="#00ff00"></circle>)}
		</g>
		<g className="del-group" onClick={onDelete}>
			<circle cx={width-20} r="10"></circle>
			<image href={trashImg} width="10" height="13" transform={`translate(${width-25},-6.5)`} />
		</g>
	</g>)
};

NodeMulti.propTypes = {
	x: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}
export default NodeMulti