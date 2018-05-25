import React from "react"
import styled from "styled-components"
import ElementContainer from "./element-container.js";
//import DesignerContainer from "./components/designer-container";
import Designer from "./designer";
import ErrorBoundary from "./error-boundaries";

const JourneyDesign = styled.div`
	display: flex;
`;

export default function() {
	return (<JourneyDesign>
				<ElementContainer/>
				<ErrorBoundary>
					<Designer width="3000" height="1200"/>
				</ErrorBoundary>
			 </JourneyDesign>)
}