import { AuthContext } from "@/components/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

export default function Root() {
	const auth = useAuth();

	return (
		<>
			<Toaster richColors position="bottom-right" />
			<AuthContext.Provider value={auth}>
				<Outlet />
			</AuthContext.Provider>
		</>
	);
}
