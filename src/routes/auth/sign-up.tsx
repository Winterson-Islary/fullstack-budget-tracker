// import { useAuthFromRoot } from "../root"
import { Config } from "@/lib/config";
import { SignUp } from "@clerk/clerk-react";

export default function Sign_Up() {
  return (
    <div> 
      <SignUp signInUrl={Config.get("sign_in_url")} />
    </div>
  )
}
