export const Currencies = [
	{ value: "USD", label: "$ Dollar", locale: "en-US" },
	{ value: "YEN", label: "¥ Japanese Yen", locale: "ja-JP" },
	{ value: "INR", label: "₹ Indian Rupee", locale: "en-IN" },
	{ value: "EUR", label: "€ Euro", locale: "de-DN" },
];

export type Currency = (typeof Currencies)[0];
