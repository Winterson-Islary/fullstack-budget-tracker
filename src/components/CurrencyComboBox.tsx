import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import Cookies from "js-cookie";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/user-media-query";
import { Currencies, type Currency } from "@/lib/currencies";

import { AuthContext } from "@/components/AuthContext";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { useCallback, useContext, useEffect, useState } from "react";

import { UpdateUserCurrencySchema, type UserSettings } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CurrencyComboBox() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedOption, setSelectedOption] = useState<Currency | null>(null);
	const [sessionCookie, setSessionCookie] = useState<string | undefined>(
		undefined,
	);
	const auth = useContext(AuthContext);

	useEffect(() => {
		setSessionCookie(Cookies.get("__session"));
	}, []);

	const queryClient = useQueryClient();
	const userSettings = useQuery({
		queryKey: ["userSettings"],
		queryFn: async () =>
			fetch("http://localhost:3000/api/settings", {
				credentials: "include",
				headers: {
					Authorization: `Bearer ${await auth?.getToken()}`,
					Cookie: `session=${sessionCookie}`,
				},
			}).then((res) => res.json()),
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
	});
	console.log("@@@ USER SETTINGS", userSettings.data?.settings.currency);

	useEffect(() => {
		if (!userSettings.data) return;
		const userCurrency = Currencies.find(
			(currency) => currency.value === userSettings.data.settings.currency,
		);
		if (userCurrency) setSelectedOption(userCurrency);
	}, [userSettings.data]);

	console.log(selectedOption);

	const UpdateUserCurrency = async (currency: string) => {
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

			body: JSON.stringify({ currency: currency }),
		});
		return updateResponse.json();
	};

	const mutation = useMutation({
		mutationFn: UpdateUserCurrency,
		onSuccess: (data: UserSettings) => {
			queryClient.invalidateQueries({
				queryKey: ["userSettings"],
				exact: true,
				refetchType: "active",
			});

			toast.success("Currency updated successfully", {
				id: "toast-update-currency",
			});
			setSelectedOption(
				Currencies.find((currency) => currency.value === data.currency) || null,
			);
		},
		onError: (err) => {
			console.log(err);
			toast.error("Something went wrong", {
				id: "toast-update-currency",
			});
		},
	});
	const selectOption = useCallback(
		(currency: Currency | null) => {
			if (currency?.value === selectedOption?.value) return;
			if (!currency) {
				toast.error("Please select a currency");
				return;
			}
			toast.loading("Updating currency...", {
				id: "toast-update-currency",
			});
			mutation.mutate(currency.value);
		},
		[mutation, selectedOption],
	);

	if (isDesktop) {
		return (
			<SkeletonWrapper isLoading={userSettings.isFetching}>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-start"
							disabled={mutation.isPending}
						>
							{selectedOption ? (
								<>{selectedOption.label}</>
							) : (
								<>+ Set currency</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0" align="start">
						<CurrencyList setOpen={setOpen} setSelectedOption={selectOption} />
					</PopoverContent>
				</Popover>
			</SkeletonWrapper>
		);
	}

	return (
		<SkeletonWrapper isLoading={userSettings.isFetching}>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-start"
						disabled={mutation.isPending}
					>
						{selectedOption ? <>{selectedOption.label}</> : <>+ Set currency</>}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4 border-t">
						<CurrencyList setOpen={setOpen} setSelectedOption={selectOption} />
					</div>
				</DrawerContent>
			</Drawer>
		</SkeletonWrapper>
	);
}

function CurrencyList({
	setOpen,
	setSelectedOption,
}: {
	setOpen: (open: boolean) => void;
	setSelectedOption: (currency: Currency | null) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter currency..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{Currencies.map((currency) => (
						<CommandItem
							key={currency.value}
							value={currency.value}
							onSelect={(value: string) => {
								setSelectedOption(
									Currencies.find((priority) => priority.value === value) ||
										null,
								);
								setOpen(false);
							}}
						>
							{currency.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
