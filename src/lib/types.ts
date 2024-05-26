import type { useAuth } from "@clerk/clerk-react";

export type ClerkUseAuth = ReturnType<typeof useAuth>;

export type UserSettings = {
	userID: string;
	currency: string;
};
export type Category = {
	createdAt: Date;
	name: string;
	userId: string;
	icon: string;
	type: string;
};

import { z } from "zod";
import { Currencies } from "./currencies";

export const UpdateUserCurrencySchema = z.object({
	currency: z.custom((value) => {
		const found = Currencies.some((currency) => currency.value === value);
		if (!found) {
			throw new Error(`invalid currency: ${value}`);
		}
		return value;
	}),
});

export type TransactionType = "income" | "expense";

export const CreateTransactionSchema = z.object({
	amount: z.coerce.number().positive().multipleOf(0.01),
	description: z.string().optional(),
	date: z.coerce.date(),
	category: z.string(),
	type: z.union([z.literal("income"), z.literal("expense")]),
});
export type CreateTransactionSchemaType = z.infer<
	typeof CreateTransactionSchema
>;

export const CreateCategorySchema = z.object({
	name: z.string().min(3).max(20),
	icon: z.string().max(20),
	type: z.enum(["income", "expense"]),
});
export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
