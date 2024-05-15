import { AuthContext } from "@/components/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
	const auth = useContext(AuthContext);
	const userSettings = useQuery({
		queryKey: ["useSettings"],
		queryFn: async () =>
			fetch("http://localhost:3000/api/settings", {
				headers: {
					Authorization: `Bearer ${await auth?.getToken()}`,
				},
			}).then((res) => res.json()),
	});
	if (!userSettings) {
		return <Navigate to="/wizard" replace />;
	}
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
