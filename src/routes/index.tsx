import { Link } from "react-router-dom";

const Index = () => {
	return (
		<>
			<h1 className="text-2xl font-bold">HOMEPAGE</h1>
			<div>
				<Link to="/dashboard" className="text-xl font-medium italic">
					Dashboard
				</Link>
			</div>
		</>
	);
};

export default Index;
