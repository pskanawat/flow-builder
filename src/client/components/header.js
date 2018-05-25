import React, {Component} from "react"
import {Link} from "react-router-dom"
import LogoSrc from "../images/fk-mini.png"
import styled from 'styled-components'


const LogoCont = styled.div`
	float: left;
	padding-right: 40px;
`;
const Logo = styled.img`
	height: 30px;
	width: 30px;
	vertical-align: middle;
`;

const LogoTitle = styled.span`
	font-size: 20px;
    color: #fff;
    font-weight: 200;
    vertical-align: middle;
`;

export default function() {
	return (<header className="app-header">
			<LogoCont>
				<Logo src={LogoSrc} />
				<LogoTitle> Journey Platform </LogoTitle>
			</LogoCont>
			<div>
				<Link to="/"> Home </Link>
				<Link to="/journeys"> Journeys </Link>
				<Link to="/journey"> Journey </Link>
				<Link to="/journey-design"> Journey Design </Link>
			</div>
		</header>);
}