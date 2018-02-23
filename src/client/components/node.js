import React from "react"
import PropTypes from 'prop-types'


const Node = ({ onClick, x, y, id, width, height }) => (
	<g data-id={id} data-x={x} data-y={y} className="node-group" transform={`translate(${x}, ${y})`}>
		<circle r="10" fill="#efefef"></circle>			
		<rect
			onClick={onClick}
			width={width}
			height={height}>
		</rect>
		<rect className="node-ports" x={width} width={width/3} height={height}></rect>
		<text className="node-title">Node title</text>
	</g>
)

Node.propTypes = {
	onClick: PropTypes.func.isRequired,
	x: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}

export default Node