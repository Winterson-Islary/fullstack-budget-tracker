import type { useAuth } from "@clerk/clerk-react";

export type ClerkUseAuth = ReturnType<typeof useAuth>;

export type UserSettings = {
	userID: string;
	currency: string;
};
