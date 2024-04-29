import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '@/routes';
import Sign_In from '@/routes/auth/sign-in';
import Sign_Up from '@/routes/auth/sign-up';
import Root from '@/routes/root';

// ROUTER
const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Index />,
				index: true
			},
			{
				path: "/sign-in/*",
				element: <Sign_In />
			},
			{
				path: "/sign-up/*",
				element: <Sign_Up />
			}
		]
	},

]);

export const Router = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}