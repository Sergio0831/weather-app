import { useQuery } from "@tanstack/react-query";
import { fetchCitySuggestions } from "@/lib/api";

export function useCitySuggestions(query: string, isFocused: boolean) {
  return useQuery({
    queryKey: ["city-suggestions", query],
    queryFn: () => fetchCitySuggestions(query),
    enabled: !!query && isFocused,
  });
}
