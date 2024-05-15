import { Link } from "react-router-dom";

export default function Dashboard() {
	//! Querying userSettings from backend
	return (
		<div className="mt-2">
			<span>
				Hello From Dashboard{" "}
				<span>
					<Link to="/" className="font-bold underline">
						Go to Home
					</Link>
				</span>
			</span>
		</div>
	);
}
