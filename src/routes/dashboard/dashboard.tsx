import { AuthContext } from "@/components/AuthContext";
import CreateTransactionDialog from "@/components/CreateTransactionDialog";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
	const auth = useContext(AuthContext);
	const { user, isLoaded } = useUser();

	const userSettings = useQuery({
		queryKey: ["useSettings"],
		queryFn: async () =>
			fetch("http://localhost:3000/api/settings", {
				headers: {
					Authorization: `Bearer ${await auth?.getToken()}`,
				},
			}).then((res) => res.json()),
	});
	if (!userSettings) {
		return <Navigate to="/wizard" replace />;
	}
	return (
		<div className="h-full bg-background">
			<div className="border-b bg-card">
				<Link to="/" className="font-bold underline">
					{" "}
					Go to Home{" "}
				</Link>
				<div className="container flex flex-wrap items-center justify-between gap-6 py-8">
					<SkeletonWrapper isLoading={!isLoaded}>
						<p className="text-3xl font-bold">Hello, {user?.firstName}!</p>
						<div className="flex items-center gap-3">
							<CreateTransactionDialog
								trigger={<Button variant={"outline"}>New income 💵</Button>}
								type="income"
							/>
							<CreateTransactionDialog
								trigger={<Button variant={"outline"}>New expense 💸</Button>}
								type="expense"
							/>
						</div>
					</SkeletonWrapper>
				</div>
			</div>
		</div>
	);
}
