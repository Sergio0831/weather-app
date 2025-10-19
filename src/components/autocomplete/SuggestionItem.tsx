import { cn, getFlagEmoji } from "@/lib/utils";
import type { GeocodingResult } from "@/types/geocoding";
import { Button } from "../ui/button";

export type SuggestionItemProps = {
  city: GeocodingResult;
  isSelected: boolean;
  onClick: () => void;
};

export default function SuggestionItem({
  city,
  isSelected,
  onClick,
}: SuggestionItemProps) {
  return (
    <Button
      aria-selected={isSelected}
      className={cn(
        "w-full justify-start border border-transparent px-2.5 py-2.5 font-medium text-base hover:border-border hover:bg-secondary",
        isSelected ? "border-border bg-secondary" : ""
      )}
      onClick={onClick}
      role="option"
    >
      <span className="text-lg">{getFlagEmoji(city.country_code)}</span>
      <span className="truncate">
        {city.name}
        {city.admin1 && <span>{` — ${city.admin1}`}</span>}
        {`${", "}${city.country}`}
      </span>
    </Button>
  );
}
