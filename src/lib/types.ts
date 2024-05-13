import type { useAuth } from "@clerk/clerk-react";

export type ClerkUseAuth = ReturnType<typeof useAuth>;

export type UserSettings = {
	userID: string;
	currency: string;
};

import { Currencies } from "./currencies";
import { z } from "zod";

export const UpdateUserSettingsSchema = z.object({
	currency: z.custom((value) => {
		const found = Currencies.some((currency) => currency.value === value);
		if (!found) {
			throw new Error(`invalid currency: ${value}`);
		}
		return value;
	}),
});
