import React from "react"
import PropTypes from 'prop-types'
import trashImg from '../images/trash.svg'

const Edge = ({ id, x1, y1, x2, y2, onClick, onDelete }) => {
	let style = {
		"markerEnd": 'url("#end-arrow")'
	}
	let d = Math.sqrt((x2-x1)**2 + (y2-y1)**2),
		delT = 0.2*d/d,
		delIconX = (1-delT)*x1 + delT*x2,
		delIconY = (1-delT)*y1 + delT*y2,
		labelT = 0.5*d/d,
		labelX = (1-labelT)*x1 + labelT*x2,
		labelY = (1-labelT)*y1 + labelT*y2;
	return (
		<g className="edge-group" data-id={id}>			
			<path d={`M ${x1} ${y1} ${x2} ${y2}`} strokeWidth="3" stroke="#ccc" style={style}></path>
			<g className="label-group" transform={`translate(${labelX}, ${labelY})`}>
				<rect className="edge-bg" x="-5" y="-13" height="16" width="60" fill="#fff"></rect>
				<text className="edge-title">Edge title</text>
			</g>
			<g className="del-group" transform={`translate(${delIconX}, ${delIconY})`} onClick={onDelete}>
				<circle r="10"></circle>
				<image href={trashImg} width="10" height="13" transform="translate(-5,-6.5)" />
			</g>
		</g>
	)
}

Edge.propTypes = {
	id: PropTypes.string.isRequired,
	x1: PropTypes.number.isRequired,
	x2: PropTypes.number.isRequired,
	y1: PropTypes.number.isRequired,
	y2: PropTypes.number.isRequired
}
export default Edge