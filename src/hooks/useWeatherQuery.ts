import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";
import { useUnits } from "./useUnits";

export function useWeatherQuery(
  selectedCity: { lat: number; lon: number; name: string } | null
) {
  const { units } = useUnits();

  return useQuery({
    queryKey: ["weather", selectedCity?.lat, selectedCity?.lon, units],
    queryFn: () => {
      if (!selectedCity) {
        throw new Error("No city selected");
      }

      return fetchWeatherData(
        selectedCity.lat,
        selectedCity.lon,
        units === "metric" ? "metric" : "imperial"
      );
    },
    enabled: !!selectedCity,
  });
}
