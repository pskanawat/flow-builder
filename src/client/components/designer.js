import { connect } from "react-redux"
import { addNode } from "../actions"
import FlowBuilder from "./flow-builder"

const mapStateToProps = state => {
  return state.designer;
}

const mapDispatchToProps = dispatch => {
  return {
    onNodeAdd: id => {
      dispatch({
		type: "ADD_NODE",
		node: addNode(id)
		});
    }
  }
}

const FlowBuilderHOC = connect(
	  mapStateToProps,
	  mapDispatchToProps
	)(FlowBuilder)
 
export default FlowBuilderHOC
