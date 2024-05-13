import AuthLayout from "@/components/providers/AuthLayout";
import DashboardLayout from "@/components/providers/DashboardLayout";
import ProtectRoute from "@/components/providers/ProtectRoute";
import Index from "@/routes";
import Sign_In from "@/routes/auth/sign-in";
import Sign_Up from "@/routes/auth/sign-up";
import Dashboard from "@/routes/dashboard/dashboard";
import Root from "@/routes/root";
import Wizard from "@/routes/wizard/wizard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WizardLayout from "./providers/WizardLayout";

// ROUTER
const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: "/",
				element: (
					<ProtectRoute>
						<Index />
					</ProtectRoute>
				),
				index: true,
			},
			{
				path: "/dashboard",
				element: (
					<ProtectRoute>
						<DashboardLayout>
							<Dashboard />
						</DashboardLayout>
					</ProtectRoute>
				),
			},
			{
				path: "/wizard",
				element: (
					<ProtectRoute>
						<WizardLayout>
							<Wizard />
						</WizardLayout>
					</ProtectRoute>
				),
				index: true,
			},
			{
				path: "/sign-in/*",
				element: (
					<AuthLayout>
						<Sign_In />
					</AuthLayout>
				),
			},
			{
				path: "/sign-up/*",
				element: (
					<AuthLayout>
						<Sign_Up />
					</AuthLayout>
				),
			},
		],
	},
]);

export const Router = () => {
	const [queryClient] = useState(() => new QueryClient({}));
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
};
