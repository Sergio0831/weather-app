export type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: HourlyWeather;
  daily_units: DailyUnits;
  daily: DailyWeather;
};

export type CurrentWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  apparent_temperature: number;
  precipitation: number;
};

export type CurrentUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  weather_code: string;
  wind_speed_10m: string;
  apparent_temperature: string;
  precipitation: string;
};

export type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export type DailyUnits = {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
};

export type HourlyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m: number[];
};

export type HourlyUnits = {
  time: string;
  weather_code: string;
  temperature_2m: string;
};
