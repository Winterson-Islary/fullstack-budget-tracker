import type { TransactionType } from "@/lib/types";

interface Props {
	type: TransactionType;
}

function CategoryPicker({ type }: Props) {
	return <div>CategoryPicker</div>;
}

export default CategoryPicker;
