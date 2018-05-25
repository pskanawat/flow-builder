import { connect } from "react-redux"
import { addNode, addEdge } from "../actions"
//import FlowBuilder from "./flow-builder"
import FlowBuilder from "draw-flow"
const mapStateToProps = state => {
  return state.designer;
}

const mapDispatchToProps = dispatch => {
  return {
    onNodeAdd: pos => {
      dispatch(addNode(pos));
    },
    onAddEdge: (source, target) => {
    	dispatch(addEdge(source, target))
    },
    onNodeClick: (node) => {
        console.log("Clicked:", node);
    },
    onNodeDelete: (node) => {
    	dispatch({type: "DELETE_NODE", node});
    },
    updateNode: (id, node) => {
    	dispatch({
    		type: "UPDATE_NODE",
    		id,
    		node
    	})
    }
  }
}

const FlowBuilderHOC = connect(
	  mapStateToProps,
	  mapDispatchToProps
	)(FlowBuilder)
 
export default FlowBuilderHOC
