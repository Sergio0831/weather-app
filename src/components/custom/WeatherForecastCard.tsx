export type WeatherForecastCardProps = {
  day: string;
  icon: React.ReactNode;
  tempMax: number;
  tempMin: number;
};

export default function WeatherForecastCard({
  day,
  icon,
  tempMax,
  tempMin,
}: WeatherForecastCardProps) {
  return (
    <div className="grid justify-center gap-4 rounded-[1.25rem] border border-border bg-popover px-2.5 py-4 text-center">
      <h4 className="text-preset-6">{day}</h4>
      <div className="[&>svg]:size-15">{icon}</div>
      <div className="flex-space-between font-medium text-base">
        <span>{tempMax}°</span>
        <span>{tempMin}°</span>
      </div>
    </div>
  );
}
