import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import { UpdateUserCurrencySchema } from "@/lib/types";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";

const auth = useContext(AuthContext);

export async function UpdateUserCurrency(currency: string) {
	const parsedBody = UpdateUserCurrencySchema.safeParse({
		currency,
	});
	if (!parsedBody.success) throw parsedBody.error;
	const updateResponse = await fetch("http://localhost:3000/api/settings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await auth?.getToken()}`,
		},

		body: JSON.stringify(currency),
	});

	return updateResponse.json();
}
