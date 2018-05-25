import CollapseComponent from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import styled from 'styled-components';
import { colors } from 'fk-react-ui-components/lib/colorCodes';

const PanelComponent = CollapseComponent.Panel;

export const Collapse = styled(CollapseComponent)`
    &.rc-collapse > .rc-collapse-item > .rc-collapse-header {
        height: auto;
        line-height: inherit;
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: solid 1px ${colors.accordionBorderColor};
    }

    &.rc-collapse > .rc-collapse-item > .rc-collapse-header .arrow {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
        font-size: 24px;
        transform: translateY(-2px);
        border: 0;
        height: 30px;
        width: 20px;
        &:before {
        	content: '';
		    display: block;
		    position: absolute;
		    height: 10px;
		    width: 3px;
		    border-radius: .3em;
		    background: #8d8d8d;
		    transform-origin: 50%;
		    top: 50%;
		    left: 50%;
		    transition: all .25s ease-in-out;
		    transform: translate(-100%,-25%) rotate(45deg);
        }
        &:after {
        	content: '';
		    display: block;
		    position: absolute;
		    height: 10px;
		    width: 3px;
		    border-radius: .3em;
		    background: #8d8d8d;
		    transform-origin: 50%;
		    top: 50%;
		    left: 50%;
		    transition: all .25s ease-in-out;
		    transform: translate(100%,-25%) rotate(-45deg);
        }
    }

    &.rc-collapse {
        background-color: ${colors.whiteText};
        border-width: 0;
        border-radius: 0;
    }

    &.rc-collapse > .rc-collapse-item > .rc-collapse-content {
        overflow-y: hidden;
    }

    &.rc-collapse
        > .rc-collapse-item
        > .rc-collapse-content {
        	padding: 0;
			& > .rc-collapse-content-box {
	        	margin: 0px;
	    	}
       }
    }

    &.rc-collapse > .rc-collapse-item-active {
        > .rc-collapse-header {
            .arrow {
                margin-right: 6px;
                &:before { 
                	transform: translate(-100%,-25%) rotate(135deg); 
                }
                &:after {
                	transform: translate(100%,-25%) rotate(-135deg);
                }
            }
        }
    }

    &.rc-collapse > .rc-collapse-item {
        border-top: none;
    }
`;

export const Panel = PanelComponent;