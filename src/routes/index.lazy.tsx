import { createLazyFileRoute } from "@tanstack/react-router";
import errorComponent from "../pages/errorComponent";

export const Route = createLazyFileRoute('/') ({
	component: Index,
	errorComponent: errorComponent,
})

function Index() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
		</div>
	)
}