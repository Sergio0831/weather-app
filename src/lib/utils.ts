import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate country flag emoji from country code
const FLAG_EMOJI_OFFSET = 127_397;

export function getFlagEmoji(countryCode?: string) {
  if (!countryCode) {
    return "🏳️"; // Default to white flag if no country code
  }

  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(FLAG_EMOJI_OFFSET + char.charCodeAt(0))
    );
}
