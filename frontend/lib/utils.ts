import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function - parse decimal value (converts comma to dot)
export const parseDecimal = (val: unknown) => {
  if (typeof val === "string") {
    if (val.trim() === "") return undefined;
    const normalized = val.replace(/,/g, ".");
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? undefined : parsed;
  }
  return val;
};
