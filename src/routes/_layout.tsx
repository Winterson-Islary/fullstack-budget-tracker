import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_layout') ({
	component: LayoutComponent,
})

function LayoutComponent() {
	return (
		<div>
			<h1 className=" text-center ">LAYOUT HEADER</h1>
			<Outlet/>
		</div>
	)
}