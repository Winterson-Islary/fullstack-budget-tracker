import AuthLayout from "@/components/providers/AuthLayout";
import DashboardLayout from "@/components/providers/DashboardLayout";
import ProtectRoute from "@/components/providers/ProtectRoute";
import Index from "@/routes";
import Sign_In from "@/routes/auth/sign-in";
import Sign_Up from "@/routes/auth/sign-up";
import Dashboard from "@/routes/dashboard/dashboard";
import Root from "@/routes/root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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