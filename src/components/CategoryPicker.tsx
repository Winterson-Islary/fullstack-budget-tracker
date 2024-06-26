import type { Category, TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/AuthContext";
import Cookies from "js-cookie";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import CreateCategoryDialog from "@/components/CreateCategoryDialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	type: TransactionType;
	onChange: (value: string) => void;
}

function CategoryPicker({ type, onChange }: Props) {
	const [value, setValue] = useState("");
	const [open, setOpen] = useState(false);
	const auth = useContext(AuthContext);
	const [sessionCookie, setSessionCookie] = useState<string | undefined>(
		undefined,
	);
	useEffect(() => {
		if (!value) return;
		onChange(value);
	}, [value, onChange]);

	useEffect(() => {
		setSessionCookie(Cookies.get("__session"));
	}, []);
	const categoriesQuery = useQuery({
		queryKey: ["categories", type],
		queryFn: async () => {
			const res = await fetch(
				`http://localhost:3000/api/categories?type=${type}`,
				{
					credentials: "include",
					headers: {
						Authorization: `Bearer ${await auth?.getToken()}`,
						Cookie: `session=${sessionCookie}`,
					},
				},
			);
			return res.json();
		},
	});

	const selectedCategory =
		categoriesQuery.data?.dbQueryResult.filter(
			(category: Category) => category.name === value,
		) || [];

	const successCallback = useCallback((category: Category) => {
		setValue(category.name);
		setOpen((prev) => !prev);
	}, []);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{selectedCategory.length !== 0 ? (
						<CategoryRow category={selectedCategory[0]} />
					) : (
						"Select category"
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<CommandInput placeholder="Search Category..." />
					<CreateCategoryDialog type={type} successCallback={successCallback} />
					<CommandEmpty>
						<p>Category not found</p>
						<p className="text-xs text-muted-foreground">
							Tip: Create a new category
						</p>
					</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{categoriesQuery.data?.dbQueryResult.map((category: Category) => (
								<CommandItem
									key={category.name}
									onSelect={() => {
										setValue(category.name);
										setOpen((prev) => !prev);
									}}
								>
									<CategoryRow category={category} />
									<Check
										className={cn(
											"mr-2 ml-2 w-4 h-4 opacity-0",
											value === category.name && "opacity-100",
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

function CategoryRow({ category }: { category: Category }) {
	return (
		<div className="flex items-center gap-2">
			<span role="img">{category.icon}</span>
			<span>{category.name}</span>
		</div>
	);
}

export default CategoryPicker;
