import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Wizard() {
	const { user, isLoaded } = useUser();
	if (!isLoaded) {
		return <div>LOADING...</div>;
	}
	if (isLoaded && user) {
		return (
			<div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
				<div className="">
					<h1 className="text-center text-3xl">
						Welcome, <span className="ml-2 font-bold">{user?.firstName}!</span>
					</h1>
					<h2 className="mt-4 text-center text-base text-muted-foreground">
						Let &apos;s get started by setting up your currency.
					</h2>
					<h3 className="mt-2 text-center text-sm text-muted-foreground">
						You can change these settings at any time.
					</h3>
				</div>
				<Separator />
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Currency</CardTitle>
						<CardDescription>
							Set your default currency for transactions
						</CardDescription>
					</CardHeader>
					<CardContent>Placeholder</CardContent>
				</Card>
				<Separator />
				<Button className="w-full" asChild>
					<Link to={"/dashboard"}>
						I&apos;m done! Take me to the Dashboard.
					</Link>
				</Button>
			</div>
		);
	}
}

export default Wizard;
