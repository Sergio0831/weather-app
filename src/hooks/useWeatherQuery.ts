import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";

export function useWeatherQuery(
  selectedCity: { lat: number; lon: number; name: string } | null
) {
  return useQuery({
    queryKey: ["weather", selectedCity?.lat, selectedCity?.lon],
    queryFn: () => {
      if (!selectedCity) {
        throw new Error("No city selected");
      }

      return fetchWeatherData(selectedCity.lat, selectedCity.lon, "celsius");
    },
    enabled: false,
  });
}
