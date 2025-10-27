import Sun from "../assets/images/clear-sunny.svg?react";
import Drizzle from "../assets/images/drizzle.svg?react";
import Fog from "../assets/images/fog.svg?react";
import Cloud from "../assets/images/partly-cloudy.svg?react";
import Rain from "../assets/images/rain.svg?react";
import Snow from "../assets/images/snow.svg?react";
import Thunder from "../assets/images/thunderstorms.svg?react";

const CLOUD = [1, 2, 3];
const FOG = [45, 48];
const DRIZZLE_CODES = [51, 53, 55, 56, 57];
const RAIN = [61, 63, 65, 66, 67, 80, 81, 82];
const SNOW = [71, 73, 75, 77, 85, 86];
const THUNDER = [95, 96, 99];

// Returns icon based on weather code
export function getWeatherIcon(weatherCode: number) {
  if (weatherCode === 0) {
    return <Sun />;
  }

  if (CLOUD.includes(weatherCode)) {
    // Partly cloudy / cloudy
    return <Cloud />;
  }

  if (FOG.includes(weatherCode)) {
    // Fog / mist
    return <Fog />;
  }

  if (DRIZZLE_CODES.includes(weatherCode)) {
    // Drizzle / Freezing drizzle
    return <Drizzle />;
  }

  if (RAIN.includes(weatherCode)) {
    // Rain / Showers
    return <Rain />;
  }

  if (SNOW.includes(weatherCode)) {
    // Snow / Snow showers
    return <Snow />;
  }

  if (THUNDER.includes(weatherCode)) {
    // Thunderstorms
    return <Thunder />;
  }

  // fallback icon
  return <Sun />;
}
