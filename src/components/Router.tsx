import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/routes";
import Sign_In from "@/routes/auth/sign-in";
import Sign_Up from "@/routes/auth/sign-up";
import Root from "@/routes/root";
import ProtectRoute from "@/components/providers/ProtectRoute";
import Dashboard from "@/routes/dashboard/dashboard";
import DashboardLayout from "@/components/providers/DashboardLayout";
import AuthLayout from "@/components/providers/AuthLayout";

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
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
