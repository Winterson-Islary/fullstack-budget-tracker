import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '@/routes/home.tsx';

// ROUTER
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
]);

export const Router = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}