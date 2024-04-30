import { Link } from "react-router-dom";

export default function HandleSignedInUser() {
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
  