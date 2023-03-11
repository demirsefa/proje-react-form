import React from "react";
import { Link } from "react-router-dom";

export function Menu() {
	return (
		<div>
			<ul>
				<li>
					<Link to={"/basic"}>Basic</Link>
				</li>
			</ul>
		</div>
	);
}
