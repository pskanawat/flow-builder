import React from "react";

import ImageSrc from "../images/event.svg";

export default () => {
	function onDrag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	}
	return (
		<section className="element-container">
			<div className="group">
				<h3 className="group-label">
					Triggers/Events <span className="group-icon open"><i className="fas fa-angle-right"></i></span>
				</h3>
				<div className="group-body">
					<div className="element" id="event-id" draggable="true" onDragStart={onDrag}>
						<img className="element-img" draggable="false" src={ImageSrc} />
						<div className="element-label">Event</div>
					</div>
					<div className="element" draggable="true">
						<img className="element-img" draggable="false" src={ImageSrc} />
						<div className="element-label">Event</div>
					</div>
					<div className="element" draggable="true">
						<img className="element-img" draggable="false" src={ImageSrc} />
						<div className="element-label">Event</div>
					</div>
				</div>
			</div>
		</section>
	);
}