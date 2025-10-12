import axios from "axios";
import type { GeocodingResponse, GeocodingResult } from "@/types/geocoding";

// Fetch city suggestions
const API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const fetchCitySuggestions = async (
  name: string
): Promise<GeocodingResult[]> => {
  if (!name.trim()) {
    return [];
  }
  const res = await axios.get<GeocodingResponse>(API_URL, {
    params: { name, count: 5 },
  });

  return res.data.results || [];
};
