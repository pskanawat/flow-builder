import React from "react";
import styled from 'styled-components';
import _ from "lodash";

import { SimpleSearchBig } from 'fk-react-ui-components/lib/SimpleSearch';
import { Collapse, Panel } from './Accordian';

import apiSvg from "../images/api.svg";
import listSvg from "../images/list.svg";
import segSvg from "../images/segment.svg";

const STENCILS = {
	"API Trigger": {
		title: "API Trigger",
		icon: apiSvg,
		bgColor: "#e7f8cd",
		strokeColor: "#b8ea86"
	},
	"Audience List": {
		title: "Audience List",
		icon: listSvg,
		bgColor: "#e9f3fe",
		strokeColor: "#9bc8ff"
	},
	"Audience Segment": {
		title: "Audience Segment",
		icon: segSvg,
		bgColor: "#e9f3fe",
		strokeColor: "#9bc8ff"
	}
}

const ElemContainer = styled.section`
	flex-basis: 332px;
    overflow: auto;
	border: 1px solid #dfdfdf;
`;

const Group = styled.div`
	padding: 0.4rem 0;
`;
const Element = styled.div`
	display: inline-block;
    text-align: center;
    min-width: 110px;
    height: 100px;
    border: 1px solid #dfdfdf;
    padding-top: 20px;
    font-size: 12px;
    color: #666;
`;

const ElementImg = styled.img`
	display: inline-block;
`;

export default () => {
	function onDrag(ev) {

		//let dragIcon = document.createElement("img");
		//dragIcon.src = ImageSrc;
		ev.dataTransfer.setData("node-attrs", JSON.stringify({...STENCILS[ev.target.title]}));
		//ev.dataTransfer.setDragImage(dragIcon, 20, 20);
	}
	return (
		<ElemContainer>
			<Collapse accordion={true} defaultActiveKey="0" >
		        <Panel header="Trigger">
		        	<div className="group-body">
						<Element title="API Trigger" draggable="true" onDragStart={onDrag}>
							<ElementImg draggable="false" src={apiSvg} />
							<div>API Trigger</div>
						</Element>
						<Element title="Audience List" draggable="true" onDragStart={onDrag}>
							<ElementImg draggable="false" src={listSvg} />
							<div>Audience List</div>
						</Element>
						<Element title="Audience Segment" draggable="true" onDragStart={onDrag}>
							<ElementImg draggable="false" src={segSvg} />
							<div>Audience Segment</div>
						</Element>
					</div>
		        </Panel>
		        <Panel header="Actions">
		        </Panel>
		        <Panel header="Condition">

		        </Panel>
		        <Panel header="Flow Control">

		        </Panel>
		    </Collapse>
			
		</ElemContainer>
	);
}