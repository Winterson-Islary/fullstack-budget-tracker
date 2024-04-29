import { Config } from "@/lib/config"
import { SignIn, useAuth } from "@clerk/clerk-react"

function SignedIn() {
  return (<p>Already Signed-in</p>)
}

function Sign_In() {
  const {isLoaded, isSignedIn} = useAuth();
  if(!isLoaded) {
    return <p>Loading...</p>
  }
  if(isSignedIn) {
    return SignedIn()
  }
  return (
    <SignIn signUpUrl={Config.get("sign_up_url")} />
  )
}

export default Sign_In