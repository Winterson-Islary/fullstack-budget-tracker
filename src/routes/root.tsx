import { AuthContext } from "@/components/AuthContext";
import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

export default function Root() {
	const auth = useAuth();

	return (
		<AuthContext.Provider value={auth}>
			<Outlet />
		</AuthContext.Provider>
	);
}
