import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import bgToday from "./assets/images/bg-today-large.svg";
import Autocomplete from "./components/autocomplete/AutoComplete";
import DaySelect from "./components/custom/DaySelect";
import HourlyForecastCard from "./components/custom/HourlyForecastCard";
import WeatherForecastCard from "./components/custom/WeatherForecastCard";
import WeatherStatCard from "./components/custom/WeatherStatCard";
import Header from "./components/layout/Header";
import { Form, FormField, FormItem, FormMessage } from "./components/ui/form";
import { useSelectedCity } from "./hooks/useSelectedCity";
import { useWeatherQuery } from "./hooks/useWeatherQuery";
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
  const { selectedCity } = useSelectedCity();
  const {
    data: weatherData,
    refetch,
    isFetching,
    isError,
  } = useWeatherQuery(selectedCity);

  const [displayWeather, setDisplayWeather] = useState<
    typeof weatherData | null
  >(null);

  const form = useForm<FormSchemeType>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      city: "",
    },
  });

  const handleChange = (val: string) => {
    setSelectedDay(val);
  };

  const onSubmit = async () => {
    const { data } = await refetch();
    setDisplayWeather(data);
  };

  useEffect(() => {
    if (displayWeather) {
      const today = format(new Date(displayWeather?.current.time), "EEEE");
      setSelectedDay(today);
    }
  }, [displayWeather]);

  const filteredHours = displayWeather?.hourly.time
    .map((time, index) => ({
      time,
      temperature: displayWeather.hourly.temperature_2m[index],
      weatherCode: displayWeather.hourly.weather_code[index],
    }))
    .filter((item) => format(parseISO(item.time), "EEEE") === selectedDay);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper px-4 pb-12 sm:px-6 sm:pb-20">
      <Header />
      {isError ? (
        <div>Something went wrong</div>
      ) : (
        <>
          <h1 className="span-full my-8 text-center text-preset-2 tracking-wide">
            How&rsquo;s the sky looking today?
          </h1>
          <div className="span-full mb-4 flex-center md:mb-12">
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
          {!displayWeather && (
            <h2 className="span-full text-center text-preset-4">
              No search result found!
            </h2>
          )}
          {displayWeather && (
            <div className="span-full grid grid-cols-4 gap-8 sm:grid-cols-8 md:grid-cols-12">
              {/* Left block */}
              <div className="span-full md:col-span-8">
                <div className="mb-6 grid gap-6 md:mb-12">
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
                          {formatDate(displayWeather.current.time)}
                        </span>
                      </div>
                      <div className="flex-center gap-5 [&>svg]:size-30">
                        {getWeatherIcon(displayWeather.current.weather_code)}
                        <span className="text-preset-1">
                          {Math.round(displayWeather.current.temperature_2m)}°
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid-cols gap-4 sm:gap-5 md:gap-6">
                    <WeatherStatCard
                      label="Feels Like"
                      value={`${Math.round(displayWeather.current.apparent_temperature)}°`}
                    />
                    <WeatherStatCard
                      label="Humidity"
                      value={`${displayWeather.current.relative_humidity_2m}%`}
                    />
                    <WeatherStatCard
                      label="Wind"
                      value={`${Math.round(displayWeather.current.wind_speed_10m)} km/h`}
                    />
                    <WeatherStatCard
                      label="Precipitation"
                      value={`${displayWeather.current.precipitation} mm`}
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <h3 className="text-preset-5">Daily forecast</h3>
                  <div className="grid-cols-sm gap-4">
                    {displayWeather.daily.time
                      .slice(0, 7)
                      .map((date, index) => (
                        <WeatherForecastCard
                          day={formatToDay(displayWeather.daily.time[index])}
                          icon={getWeatherIcon(
                            displayWeather.daily.weather_code[index]
                          )}
                          key={date}
                          tempMax={Math.round(
                            displayWeather.daily.temperature_2m_max[index]
                          )}
                          tempMin={Math.round(
                            displayWeather.daily.temperature_2m_min[index]
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
        </>
      )}
    </div>
  );
}
