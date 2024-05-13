import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonWrapper({
	children,
	isLoading,
	fullWidth = true,
}: { children: ReactNode; isLoading: boolean; fullWidth?: boolean }) {
	if (!isLoading) return children;
	return (
		<Skeleton className={cn(fullWidth && "w-full pointer-events-none")}>
			<div className="opacity-0">{children}</div>
		</Skeleton>
	);
}
