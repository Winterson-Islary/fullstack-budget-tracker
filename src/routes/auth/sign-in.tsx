import { AuthContext } from "@/components/AuthContext";
import { Config } from "@/lib/config"
import { SignIn } from "@clerk/clerk-react"
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Sign_In() {
  const redirectLocation = Config.get("after_sign_in");
  const auth = useContext(AuthContext)

  if(!auth?.isLoaded) {
    return <div>Loading...</div>
  }
  else if(auth?.isLoaded && !auth?.isSignedIn) {
    return (
      <SignIn signUpUrl={Config.get("sign_up_url")} forceRedirectUrl={redirectLocation} />
    )
  }
  else if(auth?.isLoaded && auth?.isSignedIn) {
    return <Navigate to="/dashboard" replace/>
  }
}

export default Sign_In