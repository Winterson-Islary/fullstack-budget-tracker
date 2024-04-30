// import { useAuthFromRoot } from "../root"
import { AuthContext } from "@/components/AuthContext";
import { Config } from "@/lib/config";
import { SignUp } from "@clerk/clerk-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Sign_Up() {
  const auth = useContext(AuthContext)

  if(!auth?.isLoaded) {
    return <div>Loading...</div>
  }
  else if(auth?.isLoaded && !auth?.isSignedIn) {
    return (
      <div> 
        <SignUp signInUrl={Config.get("sign_in_url")} />
      </div>
    )
  }
  else if(auth?.isLoaded && auth?.isSignedIn) {
    return HandleSignedInUser() 
  }
}

function HandleSignedInUser() {
  return (
    <div>
      <span className=" text-xl ">Already Signed In.</span>
      <div>
        <span>Go to <span><Link to="/dashboard" className=" font-bold ">Dashboard</Link></span></span>
      </div>
      <span className="">Or</span>
      <div className="">
        <span className="font-bold underline">Create new user</span>
      </div>
    </div>
  )
}
