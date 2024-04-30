import { AuthContext } from "@/components/AuthContext";
import HandleSignedInUser from "@/components/HandleSignedInUser";
import { Config } from "@/lib/config";
import { SignUp } from "@clerk/clerk-react";
import { useContext } from "react";

export default function Sign_Up() {
	const auth = useContext(AuthContext);

	if (!auth?.isLoaded) {
		return <div>Loading...</div>;
	}
	if (auth?.isLoaded && !auth?.isSignedIn) {
		return (
			<div>
				<SignUp signInUrl={Config.get("sign_in_url")} />
			</div>
		);
	}
	if (auth?.isLoaded && auth?.isSignedIn) {
		return <HandleSignedInUser />;
	}
}
