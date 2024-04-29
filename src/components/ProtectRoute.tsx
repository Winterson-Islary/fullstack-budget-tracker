import { useAuth } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

type ProtectedRouteProps = PropsWithChildren;


export default function ProtectRoute({ children }: ProtectedRouteProps) {
	const auth = useAuth();
	const location = useLocation();
	
	if(!auth.isLoaded){
		return <div className="text-2xl">Loading...</div>
	}
	else if(auth.isLoaded && !auth.isSignedIn) {
		return <Navigate to='/sign-in' replace state={{from: location.pathname}} />
	}

	return ( 
		<AuthContext.Provider value={auth}>
			{children} 
		</AuthContext.Provider>
	)
}
