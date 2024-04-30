import type { ClerkUseAuth } from "@/lib/types";
import { createContext } from "react";

export const AuthContext = createContext<ClerkUseAuth | undefined>(undefined);
