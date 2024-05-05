import { Router } from "@/components/Router.tsx";
import { Config } from "@/lib/config.ts";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";

// CLERK
const PUBLISHABLE_KEY = Config.get("publishable_key");

// React Query
const [queryClient] = React.useState(() => new QueryClient({}));
// RENDERER
const postEl: HTMLElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(postEl).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	</React.StrictMode>,
);
