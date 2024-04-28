import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";
import { Config } from "@/lib/config";

export const Route = createFileRoute("/(auth)/sign-up/$") ({
	component: ()=>{ return <SignUp signInUrl={ Config.get('sign_in_url') } signInForceRedirectUrl={ Config.get('after_sign_in') }/> },
})
