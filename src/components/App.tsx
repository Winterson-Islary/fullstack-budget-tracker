import { routeTree } from '@/routeTree.gen.ts'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'

const router = createRouter({ 
	routeTree,
	context: {
    	//? from tanstack docs: auth will be initially be undefined, auth state will be passed from within a react component. 
		auth: undefined!,
	},  
})


declare module '@tanstack/react-router' {
interface Register {
    router: typeof router
}
}
export const App = () => {
    const auth = useAuth();
    return <RouterProvider router={router} context={{ auth }}/>
}