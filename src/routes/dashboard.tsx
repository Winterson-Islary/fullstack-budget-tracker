import { Link } from "react-router-dom";

export default function Dashboard() {
	return (
		<div>
			<p className="text-2xl font-bold">Welcome to Dashboard...</p> 
			<Link to="/" className="text-xl font-bold italic">Home</Link>
		</div>

	)
}
