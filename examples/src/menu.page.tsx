import { Link } from "react-router-dom";
import React from "react";

export default function MenuPage() {
	return (
		<ul className={"menu"}>
			<li>
				<Link to={"/basic"}>Basic</Link>
			</li>
			<li>
				<Link to={"/debounce"}>Debounce</Link>
			</li>
			<li>
				<Link to={"/submit-condition"}>Submit Condition</Link>
			</li>
			<li>
				<Link to={"/all-validations"}>All Validations</Link>
			</li>
			<li>
				<Link to={"/custom-validation"}>Custom Validation</Link>
			</li>
			<li>
				<Link to={"/async-validation"}>Async Validation</Link>
			</li>
			<li>
				<Link to={"/async-submit"}>Async Submit</Link>
			</li>
			<li>
				<Link to={"/custom-component"}>Custom Component</Link>
			</li>
			<li>
				<Link to={"/watcher-form-page"}>Watcher Form Page</Link>
			</li>
			<li>
				<Link to={"/simple-without-context"}>Simple Without Context</Link>
			</li>
			<li>
				<Link to={"/confirm"}>Confirm</Link>
			</li>{" "}
		</ul>
	);
}
