import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";

export const Route = createFileRoute("/(auth)/sign-up/$") ({
	component: ()=>{ return <SignUp /> },
})
