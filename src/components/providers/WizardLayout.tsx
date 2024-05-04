import type { ReactNode } from "react";

function WizardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex h-screen w-full flex-col items-center justify-center">
			{children}
		</div>
	);
}

export default WizardLayout;
