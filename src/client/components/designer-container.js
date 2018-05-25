import React from "react";
import styled from 'styled-components'
import FlowBuilder from "./flow-builder";
const DesignerContainer = styled.section`
	flex: 3;
	overflow: auto;
`; 

class Designer extends React.Component {
	constructor(props){
		super(props);
	}
	onDragOver(ev) {
		ev.preventDefault();
	}

	onDrop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		console.dir(data);
		//ev.target.appendChild(document.getElementById(data));
	}
	onDragStart() {
		console.log("Drag start", arguments);
	}

	onDragEnd() {
		console.log("Drag End", arguments);
	}

	render() {
		return (
			<DesignerContainerDesignerContainer>
				<svg width={this.props.width} height={this.props.height} onDrop={this.onDrop} onDragOver={this.onDragOver}>
					<FlowBuilder />
				</svg>
			</DesignerContainer>
		)
	}
}

export default Designer;