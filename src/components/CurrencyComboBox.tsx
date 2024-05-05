import { useMediaQuery } from "@/hooks/user-media-query";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Currencies, type Currency } from "@/lib/currencies";

export function CurrencyComboBox() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedOption, setSelectedOption] = useState<Currency | null>(null);

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full justify-start">
						{selectedOption ? <>{selectedOption.label}</> : <>+ Set currency</>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<CurrencyList
						setOpen={setOpen}
						setSelectedOption={setSelectedOption}
					/>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-full justify-start">
					{selectedOption ? <>{selectedOption.label}</> : <>+ Set currency</>}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<CurrencyList
						setOpen={setOpen}
						setSelectedOption={setSelectedOption}
					/>
				</div>
			</DrawerContent>
		</Drawer>
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
