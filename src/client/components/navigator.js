import React from 'react'
import Node from './node'

import styled from 'styled-components'

const Nav = styled.div`
	position: fixed;
    bottom: 0;
    right: 0;
    border: 2px solid #e8e8e8;
    margin: 14px;
`;

const Navigator = ({nodes, width, height}) => {
	return (
		<Nav>
			<Nav>
				<svg width="200" height="100">
					<g className="navigator-group" transform="scale(0.15,0.15)">
							{_.map(nodes, 
								(node, id) => <Node key={id} id={id} 
								x={node.x} 
								y={node.y} 
								width={width} 
								height={height} />)}
						</g>
				</svg>
			</Nav>
			<div className="navigator-controls">
				<div className="zoom-in"> + </div>
				<div className="zoom-out"> - </div>
				<div className="reset"> R </div>
			</div>
		</Nav>
	)
}

export default Navigator;