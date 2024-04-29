import { Config } from "@/lib/config"
import { SignIn } from "@clerk/clerk-react"
import { useLocation} from "react-router-dom"


function Sign_In() {
  const location = useLocation();
  const redirectLocation =  location.state?.from //|| Config.get("after_sign_in");
  console.log(redirectLocation)

  return (
    <SignIn signUpUrl={Config.get("sign_up_url")} forceRedirectUrl={redirectLocation} />
  )
}

export default Sign_In