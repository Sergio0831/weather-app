import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
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

// Format date to a readable string
export function formatDate(date: string) {
  try {
    return format(parseISO(date), "EEEE, MMM d, yyyy");
  } catch {
    return "";
  }
}

export function formatToDay(dateString: string): string {
  if (!dateString) {
    return "";
  }
  const date = parseISO(dateString);
  return format(date, "EEE"); // "EEE" → short day name (Sun, Mon, Tue)
}
