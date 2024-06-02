import {
	CreateTransactionSchema,
	type CreateTransactionSchemaType,
	type TransactionType,
} from "@/lib/types";
import {
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
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
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "@/components/CategoryPicker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import { json } from "stream/consumers";

interface Props {
	trigger: ReactNode;
	type: TransactionType;
}

function CreateTransactionDialog({ trigger, type }: Props) {
	const [sessionCookie, setSessionCookie] = useState<string | undefined>(
		undefined,
	);
	useEffect(() => {
		setSessionCookie(Cookies.get("__session"));
	}, []);
	const auth = useContext(AuthContext);
	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	});
	const CreateTransaction = async (values: CreateTransactionSchemaType) => {
		const parsedBody = CreateTransactionSchema.safeParse(values);
		if (!parsedBody.success) throw new Error(parsedBody.error.message);
		const queryResponse = await fetch(
			"http://localhost:3000/api/transactions",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth?.getToken()}`,
					Cookie: `session=${sessionCookie}`,
				},
				body: JSON.stringify(parsedBody),
			},
		);
		return await queryResponse.json();
	}; //! COMPLETE THE createTRANSACTION IMPLEMENTATION
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
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								form.reset();
							}}
						>
							Cancel
						</Button>
					</DialogClose>
					<Button onClick={form.handleSubmit(formSubmit)} disabled={isPending}>
						{!isPending && "Create"}
						{isPending && <Loader2 className="animate-spin" />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default CreateTransactionDialog;
