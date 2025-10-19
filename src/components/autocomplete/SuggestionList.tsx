import type { GeocodingResult } from "@/types/geocoding";
import SuggestionItem from "./SuggestionItem";

export type SuggestionListProps = {
  suggestions: GeocodingResult[];
  selectedIndex: number;
  onSelect: (city: GeocodingResult) => void;
};

export default function SuggestionList({
  suggestions,
  selectedIndex,
  onSelect,
}: SuggestionListProps) {
  return (
    <ul
      className="absolute z-10 mt-3.5 grid w-full gap-y-1 rounded-xl border border-secondary bg-popover p-2 text-popover-foreground"
      id="suggestions-list"
    >
      {suggestions.map((city, index) => (
        <li key={city.id}>
          <SuggestionItem
            city={city}
            isSelected={index === selectedIndex}
            onClick={() => onSelect(city)}
          />
        </li>
      ))}
    </ul>
  );
}
