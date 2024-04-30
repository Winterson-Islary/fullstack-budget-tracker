import { type PropsWithChildren, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/components/AuthContext";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectRoute({ children }: ProtectedRouteProps) {
	const auth = useContext(AuthContext);
	const location = useLocation();

	if (!auth?.isLoaded) {
		return <div className="text-2xl">Loading...</div>;
	}
	if (auth?.isLoaded && !auth?.isSignedIn) {
		return (
			<Navigate to="/sign-in" replace state={{ from: location.pathname }} />
		);
	}

	return children;
}
