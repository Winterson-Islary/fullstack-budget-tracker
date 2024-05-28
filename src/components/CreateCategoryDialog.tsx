import {
	CreateCategorySchema,
	type CreateCategorySchemaType,
	type TransactionType,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
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
import { Popover, PopoverTrigger } from "@/components/ui/popover";

interface Props {
	type: TransactionType;
}
function CreateCategoryDialog({ type }: Props) {
	const [open, setOpen] = useState(false);
	const form = useForm<CreateCategorySchemaType>({
		resolver: zodResolver(CreateCategorySchema),
		defaultValues: {
			type,
		},
	});
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center justify-start border-separate rounded-none border-b p-3 text-muted-foreground"
				>
					<PlusSquare className="mr-2 h-4 w-4" />
					Create new
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create
						<span
							className={cn(
								"m-1",
								type === "income" ? "text-emerald-500" : "text-red-500",
							)}
						>
							{type}
						</span>
						category
					</DialogTitle>
					<DialogDescription>
						Create Categories to group your transactions
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input defaultValue={""} {...field} />
									</FormControl>
									<FormDescription>
										Category description (Optional)
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button variant="outline" className="h-[100px] w-full">
													{form.watch("icon") ? (
														<div>Selected Icon</div>
													) : (
														<div>No selection</div>
													)}
												</Button>
											</PopoverTrigger>
										</Popover>
									</FormControl>
									<FormDescription>
										Set an Icon to represent your category in the app
									</FormDescription>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateCategoryDialog;
