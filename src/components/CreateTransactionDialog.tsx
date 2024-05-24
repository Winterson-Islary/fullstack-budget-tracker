import {
	CreateTransactionSchema,
	type CreateTransactionSchemaType,
	type TransactionType,
} from "@/lib/types";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "@/components/CategoryPicker";

interface Props {
	trigger: ReactNode;
	type: TransactionType;
}

function CreateTransactionDialog({ trigger, type }: Props) {
	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	});
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create a new{" "}
						<span
							className={cn(
								"m-1",
								type === "income" ? "text-emerald-500" : "text-red-500",
							)}
						>
							{type}
						</span>
						transaction
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input defaultValue={""} {...field} />
									</FormControl>
									<FormDescription>
										Transaction Description (Optional)
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input defaultValue={0} type="number" {...field} />
									</FormControl>
									<FormDescription>
										Transaction amount (Required)
									</FormDescription>
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-between gap-2">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<CategoryPicker type={type} />
										<FormDescription>
											Select a category for this transaction
										</FormDescription>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateTransactionDialog;
