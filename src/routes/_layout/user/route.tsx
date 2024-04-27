import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_layout/user') ({
	component: route,
})

function route() {
	return (
		<h3 className=" underline ">HELLO FROM USER!</h3>
	)
}