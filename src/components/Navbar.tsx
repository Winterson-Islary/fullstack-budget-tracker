import { ThemeChanger } from "@/components/ThemeChanger";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<DesktopNavbar />
			<MobileNavbar />
		</>
	);
};

const navItems = [
	{ label: "Dashboard", link: "/dashboard" },
	{ label: "Transactions", link: "/transactions" },
	{ label: "Manage", link: "/manage" },
];
function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="block border-separate border-b bg-background md:hidden">
			<nav className="container flex items-center justify-between px-8 py-2">
				<div id="logo-container-mobile" className="text-2xl">
					LOGO
				</div>
				<div id="sheet-container" className="flex items-center gap-3">
					<ThemeChanger />
					<UserButton afterSignOutUrl="/sign-in" />
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant={"ghost"} size={"icon"}>
								<Menu />
							</Button>
						</SheetTrigger>
						<SheetContent className={"w-[400px] sm:w-[540px]"} side={"right"}>
							<div className="flex flex-col gap-1 pt-4">
								{navItems.map((item) => (
									<NavbarItem
										key={item.label}
										link={item.link}
										label={item.label}
										onLinkClick={() => setIsOpen((prev) => !prev)}
									/>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</div>
	);
}
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
				<div className="flex items-center gap-3">
					<ThemeChanger />
					<UserButton afterSignOutUrl="/sign-in" />
				</div>
			</nav>
		</div>
	);
}

function NavbarItem({
	label,
	link,
	onLinkClick,
}: { label: string; link: string; onLinkClick?: () => void }) {
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
				onClick={() => {
					if (onLinkClick) onLinkClick();
				}}
			>
				{label}
			</Link>
		</div>
	);
}
