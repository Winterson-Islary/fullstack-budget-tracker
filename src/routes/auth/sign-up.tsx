// import { useAuthFromRoot } from "../root"
import { Config } from "@/lib/config";
import { useAuth } from "@clerk/clerk-react";
import { SignUp } from "@clerk/clerk-react";

function NotSignedIn() {
  return (
    <div>
        <SignUp signInUrl={Config.get("sign_in_url")} />
    </div>
  )
}


export default function Sign_Up() {
  const {isLoaded, isSignedIn} = useAuth();

  if(!isLoaded) {
    return <div>Loading...</div>
  }
  if(!isSignedIn) {
    return NotSignedIn();
  }
  else return (
	<div> Hello From Sign-up Page</div>
  )
}
