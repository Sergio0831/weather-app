import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import bgToday from "./assets/images/bg-today-large.svg";
import Sun from "./assets/images/clear-sunny.svg?react";
import Autocomplete from "./components/autocomplete/AutoComplete";
import DaySelect from "./components/custom/DaySelect";
import HourlyForecastCard from "./components/custom/HourlyForecastCard";
import WeatherForecastCard from "./components/custom/WeatherForecastCard";
import WeatherStatCard from "./components/custom/WeatherStatCard";
import Header from "./components/layout/Header";
import { Form, FormField, FormItem, FormMessage } from "./components/ui/form";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const queryClient = new QueryClient();

const FormScheme = z.object({
  city: z.string().min(2, "City name must be at least 2 characters"),
});

type FormSchemeType = z.infer<typeof FormScheme>;

export default function App() {
  const form = useForm<FormSchemeType>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      city: "",
    },
  });

  const [selectedDay, setSelectedDay] = useState<string>("");

  const handleChange = (val: string) => {
    setSelectedDay(val);
  };

  const onSubmit = (data: FormSchemeType) => {
    console.log(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper px-4 pb-12 sm:px-6 sm:pb-20">
        <Header />
        <h1 className="span-full my-8 text-center text-preset-2 tracking-wide">
          How&rsquo;s the sky looking today?
        </h1>
        <div className="span-full flex-center md:mb-4">
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
        <div className="span-full md:col-span-8">
          <div className="mb-6 grid gap-6 md:mb-12">
            <div
              className="rounded-[1.25rem] bg-center bg-cover bg-no-repeat px-6 py-20"
              style={{ backgroundImage: `url(${bgToday})` }}
            >
              <div className="flex-space-between flex-col gap-4 sm:flex-row">
                <div className="text-center sm:text-left">
                  <h2 className="mb-3 text-preset-4 leading-2">
                    Berlin, Germany
                  </h2>
                  <span className="text-preset-6">Tuesday, Aug 5, 2025</span>
                </div>
                <div className="flex-center gap-5">
                  <Sun className="size-30" />
                  <span className="text-preset-1">68°</span>
                </div>
              </div>
            </div>
            <div className="grid-cols gap-4 sm:gap-5 md:gap-6">
              <WeatherStatCard label="Feels Like" value="64°" />
              <WeatherStatCard label="Humidity" value="46%" />
              <WeatherStatCard label="Wind" value="9 mph" />
              <WeatherStatCard label="Precipitation" value="0 in" />
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="text-preset-5">Daily forecast</h3>
            <div className="grid-cols-sm gap-4">
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
              <WeatherForecastCard
                day="Tue"
                icon={<Sun />}
                tempMax={20}
                tempMin={14}
              />
            </div>
          </div>
        </div>
        <div className="span-full rounded-[1.25rem] bg-popover px-4 py-5 sm:px-6 sm:py-6 md:col-span-4">
          <div className="mb-4 flex-space-between flex-wrap gap-2">
            <h3 className="text-preset-5">Hourly forecast</h3>
            <DaySelect
              days={days}
              onChange={handleChange}
              value={selectedDay}
            />
          </div>
          <div className="grid gap-4">
            <HourlyForecastCard icon={<Sun />} temp={20} time={3} />
            <HourlyForecastCard icon={<Sun />} temp={20} time={3} />
            <HourlyForecastCard icon={<Sun />} temp={20} time={3} />
          </div>
          <div />
        </div>
      </div>
    </QueryClientProvider>
  );
}
