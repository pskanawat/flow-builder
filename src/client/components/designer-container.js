import React from "react";

export default ({
	width,
	height,
	bgCls
}) => {
	return (
		<section className="designer-container">
			<svg width={width} height={height}>
				<g xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			        <g transform="translate(-635.000000, -235.000000)" fill="#FFFFFF">
			            <g transform="translate(404.000000, 211.000000)">
			                <g transform="translate(220.000000, 0.000000)">
			                    <g transform="translate(11.000000, 18.000000)">
			                        <polygon points="13 25.5 5.35879172 29.5172209 6.81813264 21.0086105 0.636265288 14.9827791 9.17939586 13.7413895 13 6 16.8206041 13.7413895 25.3637347 14.9827791 19.1818674 21.0086105 20.6412083 29.5172209 "/>
			                    </g>
			                </g>
			            </g>
			        </g>
			    </g>
			</svg>
		</section>
	);
}