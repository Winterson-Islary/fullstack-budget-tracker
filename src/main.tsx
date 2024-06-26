import { Router } from "@/components/Router.tsx";
import { Config } from "@/lib/config.ts";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";

// CLERK
const PUBLISHABLE_KEY = Config.get("publishable_key");

// React Query
// RENDERER
const postEl: HTMLElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(postEl).render(
	<React.StrictMode>
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
				<Router />
			</ClerkProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
