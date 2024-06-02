import {
	CreateTransactionSchema,
	type CreateTransactionSchemaType,
	type TransactionType,
} from "@/lib/types";
import { useCallback, type ReactNode } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

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

	const handleCategoryChange = useCallback(
		(value: string) => {
			form.setValue("category", value);
		},
		[form],
	);

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
										Provide a description for your transaction (Optional)
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

						<div className="flex items-start justify-between gap-5">
							<FormField
								control={form.control}
								name="category"
								render={(/*{ field }*/) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<CategoryPicker
											type={type}
											onChange={handleCategoryChange}
										/>
										<FormDescription>
											Select a category for this transaction
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Transaction Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[200px] pl-3 text-left font-normal",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormDescription>
											Select a date for this transaction
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
