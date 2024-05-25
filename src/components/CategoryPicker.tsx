import type { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

interface Props {
	type: TransactionType;
}

function CategoryPicker({ type }: Props) {
	const [sessionCookie, setSessionCookie] = useState<string | undefined>(
		undefined,
	);
	const auth = useContext(AuthContext);
	useEffect(() => {
		setSessionCookie(Cookies.get("__session"));
	}, []);
	// ! INCOMPLETE (UNDER-CONSTRUCTION)
	const categoriesQuery = useQuery({
		queryKey: ["categories", type],
		queryFn: async () =>
			fetch(`http://localhost:3000/api/categories?type=${type}`, {
				credentials: "include",
				headers: {
					Authorization: `Bearer ${await auth?.getToken()}`,
					Cookie: `session=${sessionCookie}`,
				},
			}).then((res) => res.json()),
	});

	return <div>CategoryPicker</div>;
}

export default CategoryPicker;
