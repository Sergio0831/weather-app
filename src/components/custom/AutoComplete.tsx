"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchIcon from "@/assets/images/icon-search.svg?react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCitySuggestions } from "@/lib/api";
import { cn, getFlagEmoji } from "@/lib/utils";
import type { GeocodingResult } from "@/types/geocoding";
import { Spinner } from "../ui/spinner";

const DEBOUNCE_MS = 300;
const BLUR_TIMEOUT_MS = 200;

type AutoCompleteProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSelectCity?: (city: GeocodingResult) => void;
};

export default function Autocomplete({
  value = "",
  onChange,
  onSelectCity,
}: AutoCompleteProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, DEBOUNCE_MS);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["city-suggestions", debouncedQuery],
    queryFn: () => fetchCitySuggestions(debouncedQuery),
    enabled: !!debouncedQuery && isFocused,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selected = suggestions[selectedIndex];
      if (selected) {
        setQuery(selected.name);
        onChange?.(selected.name);
        onSelectCity?.(selected);
      }
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (city: GeocodingResult) => {
    setQuery(city.name);
    onChange?.(city.name);
    onSelectCity?.(city);
    setSelectedIndex(-1);
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), BLUR_TIMEOUT_MS);
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative w-full text-neutral-200">
          <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-6 size-5" />
          <Input
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-expanded={suggestions.length > 0}
            aria-label="Search for city"
            className="w-full pl-15 focus-visible:ring-offset-background md:w-[526px]"
            onBlur={handleBlur}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder="Search for a place..."
            type="search"
            value={query}
          />
        </div>
        <Button
          aria-label="Search"
          className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-3 focus-visible:ring-offset-background"
          size="xl"
          type="submit"
          variant="accent"
        >
          Search
        </Button>
      </div>
      {isFocused &&
        (isFetching || suggestions.length > 0) &&
        (isFetching ? (
          <div className="absolute z-10 mt-2.5 h-[55px] w-full rounded-xl border border-secondary bg-popover p-2 text-popover-foreground">
            <div
              aria-live="polite"
              className="flex items-center gap-y-2.5 px-2 py-2.5"
            >
              <Spinner />
              <span className="ml-2 font-medium text-base">
                Search in progress
              </span>
            </div>
          </div>
        ) : (
          <ul
            className="absolute z-10 mt-3.5 grid w-full gap-y-1 rounded-xl border border-secondary bg-popover p-2 text-popover-foreground"
            id="suggestions-list"
          >
            {suggestions.map((city, index) => (
              <li key={city.id}>
                <Button
                  aria-selected={index === selectedIndex}
                  className={cn(
                    "w-full justify-start border border-transparent px-2.5 py-2.5 font-medium text-base hover:border-border hover:bg-secondary",
                    index === selectedIndex ? "border-border bg-secondary" : ""
                  )}
                  onClick={() => handleSuggestionClick(city)}
                  role="option"
                >
                  <span className="text-lg">
                    {getFlagEmoji(city.country_code)}
                  </span>
                  <span className="truncate">
                    {city.name}
                    {city.admin1 && <span>{` — ${city.admin1}`}</span>}
                    {`${", "}${city.country}`}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
