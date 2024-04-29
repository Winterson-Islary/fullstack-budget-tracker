import { Config } from "@/lib/config"
import { SignIn } from "@clerk/clerk-react"

function Sign_In() {
  const redirectLocation = Config.get("after_sign_in");

  return (
    <SignIn signUpUrl={Config.get("sign_up_url")} forceRedirectUrl={redirectLocation} />
  )
}

export default Sign_In