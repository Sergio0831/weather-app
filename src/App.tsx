import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import bgToday from "./assets/images/bg-today-large.svg";
import Autocomplete from "./components/autocomplete/AutoComplete";
import DaySelect from "./components/custom/DaySelect";
import ErrorState from "./components/custom/ErrorState";
import HourlyForecastCard from "./components/custom/HourlyForecastCard";
import WeatherForecastCard from "./components/custom/WeatherForecastCard";
import WeatherStatCard from "./components/custom/WeatherStatCard";
import Header from "./components/layout/Header";
import { Form, FormField, FormItem, FormMessage } from "./components/ui/form";
import { useSelectedCity } from "./hooks/useSelectedCity";
import { useWeatherQuery } from "./hooks/useWeatherQuery";
import { fetchCitySuggestions } from "./lib/api";
import { getWeatherIcon } from "./lib/getWeatherIcon";
import { formatDate, formatToDay } from "./lib/utils";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const FormScheme = z.object({
  city: z.string().min(2, "City name must be at least 2 characters"),
});

type FormSchemeType = z.infer<typeof FormScheme>;

export default function App() {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const {
    data: weatherData,
    isFetching,
    isError,
    refetch,
  } = useWeatherQuery(selectedCity);

  const form = useForm<FormSchemeType>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      city: "",
    },
  });

  const handleChange = (val: string) => {
    setSelectedDay(val);
  };

  const onSubmit = async (value: FormSchemeType) => {
    const results = await fetchCitySuggestions(value.city);

    if (!results.length) {
      setHasSearched(true);
      return;
    }

    const city = results[0];
    setSelectedCity({
      lat: city.latitude,
      lon: city.longitude,
      name: city.name,
    });
    setHasSearched(false);
  };

  useEffect(() => {
    if (weatherData) {
      const today = format(new Date(weatherData?.current.time), "EEEE");
      setSelectedDay(today);
    }
  }, [weatherData]);

  const filteredHours = weatherData?.hourly.time
    .map((time, index) => ({
      time,
      temperature: weatherData.hourly.temperature_2m[index],
      weatherCode: weatherData.hourly.weather_code[index],
    }))
    .filter((item) => format(parseISO(item.time), "EEEE") === selectedDay);

  return (
    <div className="wrapper px-4 pb-12 sm:px-6 sm:pb-20">
      <Header className="mb-12 md:mb-16" />
      {isError ? (
        <ErrorState
          message=" We couldn&rsquo;t connect to the server (API error). Please try again in
        a few moments."
          onRetry={() => refetch()}
          title="Something went wrong"
        />
      ) : (
        <main>
          <h1 className="mb-12 text-center text-preset-2 tracking-wide md:mb-16">
            How&rsquo;s the sky looking today?
          </h1>
          <div className="mb-4 flex-center md:mb-12">
            <Form {...form}>
              <form
                className="flex flex-col gap-x-4 gap-y-3 max-md:w-full sm:flex-row"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Autocomplete
                        onChange={field.onChange}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          {hasSearched && !weatherData && (
            <h2 className="span-full text-center text-preset-4">
              No search result found!
            </h2>
          )}
          {isFetching && <div>Loading...</div>}
          {weatherData && (
            <div className="grid grid-cols-4 gap-8 sm:grid-cols-8 md:grid-cols-12">
              {/* Left block */}
              <div className="span-full md:col-span-8">
                <div className="mb-6 grid gap-8 md:mb-12">
                  <div
                    className="rounded-[1.25rem] bg-center bg-cover bg-no-repeat px-6 py-20"
                    style={{ backgroundImage: `url(${bgToday})` }}
                  >
                    <div className="flex-space-between flex-col gap-4 sm:flex-row">
                      <div className="text-center sm:text-left">
                        <h2 className="mb-3 text-preset-4 leading-2">
                          {selectedCity?.name}
                        </h2>
                        <span className="text-preset-6">
                          {formatDate(weatherData.current.time)}
                        </span>
                      </div>
                      <div className="flex-center gap-5 [&>svg]:size-30">
                        {getWeatherIcon(weatherData.current.weather_code)}
                        <span className="text-preset-1">
                          {Math.round(weatherData.current.temperature_2m)}°
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid-cols gap-4 sm:gap-5 md:gap-6">
                    <WeatherStatCard
                      label="Feels Like"
                      value={`${Math.round(weatherData.current.apparent_temperature)}°`}
                    />
                    <WeatherStatCard
                      label="Humidity"
                      value={`${weatherData.current.relative_humidity_2m}%`}
                    />
                    <WeatherStatCard
                      label="Wind"
                      value={`${Math.round(weatherData.current.wind_speed_10m)} km/h`}
                    />
                    <WeatherStatCard
                      label="Precipitation"
                      value={`${weatherData.current.precipitation} mm`}
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <h3 className="text-preset-5">Daily forecast</h3>
                  <div className="grid-cols-sm gap-4">
                    {weatherData.daily.time.slice(0, 7).map((date, index) => (
                      <WeatherForecastCard
                        day={formatToDay(weatherData.daily.time[index])}
                        icon={getWeatherIcon(
                          weatherData.daily.weather_code[index]
                        )}
                        key={date}
                        tempMax={Math.round(
                          weatherData.daily.temperature_2m_max[index]
                        )}
                        tempMin={Math.round(
                          weatherData.daily.temperature_2m_min[index]
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Right block */}
              <div className="span-full relative md:col-span-4">
                <div className="max-h-[60vh] w-full overflow-y-scroll rounded-[1.25rem] bg-popover px-4 py-5 pr-2 sm:px-6 sm:py-6 md:absolute md:h-full md:max-h-none">
                  <div className="mb-4 flex-space-between flex-wrap gap-2">
                    <h3 className="text-preset-5">Hourly forecast</h3>
                    <DaySelect
                      days={days}
                      onChange={handleChange}
                      value={selectedDay}
                    />
                  </div>
                  <div className="grid gap-4">
                    {filteredHours?.map((hour) => (
                      <HourlyForecastCard
                        icon={getWeatherIcon(hour.weatherCode)}
                        key={hour.time}
                        temp={Math.round(hour.temperature)}
                        time={format(parseISO(hour.time), "h a")}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div />
            </div>
          )}
        </main>
      )}
    </div>
  );
}
