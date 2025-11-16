import axios from "axios";
import type { GeocodingResponse, GeocodingResult } from "@/types/geocoding";
import type { WeatherResponse } from "@/types/weather";

// Fetch city suggestions
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const fetchCitySuggestions = async (
  name: string
): Promise<GeocodingResult[]> => {
  if (!name.trim()) {
    return [];
  }
  const res = await axios.get<GeocodingResponse>(GEOCODING_API_URL, {
    params: { name, count: 5 },
  });

  return res.data.results ?? [];
};

// Fetch weather data
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeatherData = async (
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherResponse> => {
  const isImperial = units === "imperial";

  const params = {
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,precipitation",
    hourly: "weather_code,temperature_2m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    ...(isImperial && {
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      precipitation_unit: "inch",
    }),
  };

  const { data } = await axios.get<WeatherResponse>(WEATHER_API_URL, {
    params,
  });

  return data;
};
