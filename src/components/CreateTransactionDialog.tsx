import type { TransactionType } from "@/lib/types";
import type { ReactNode } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface Props {
	trigger: ReactNode;
	type: TransactionType;
}

function CreateTransactionDialog({ trigger, type }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
		</Dialog>
	);
}

export default CreateTransactionDialog;
