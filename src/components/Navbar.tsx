import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export const Navbar = () => {
	return (
		<>
			<DesktopNavbar />
		</>
	);
};

const navItems = [
	{ label: "Dashboard", link: "/dashboard" },
	{ label: "Transactions", link: "/transactions" },
	{ label: "Manage", link: "/manage" },
];

function DesktopNavbar() {
	return (
		<div className="hidden border-separate border-b bg-background md:block">
			<nav className="container flex items-center justify-between px-8">
				<div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
					<span>LOGO</span>
					<div className="flex h-full">
						{navItems.map((item) => (
							<NavbarItem
								key={item.label}
								label={item.label}
								link={item.link}
							/>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}

function NavbarItem({ label, link }: { label: string; link: string }) {
	const location = useLocation();
	const isActive = location.pathname === link;

	return (
		<div className="relative flex items-center">
			<Link
				to={link}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"w-full justify-start text-lg text-muted-foreground hover:text-foreground",
					isActive && "text-foreground",
				)}
			>
				{label}
			</Link>
		</div>
	);
}
