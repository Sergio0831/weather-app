export type HourlyForecastCardProps = {
  icon: React.ReactNode;
  time: string;
  temp: number;
};

export default function HourlyForecastCard({
  icon,
  time,
  temp,
}: HourlyForecastCardProps) {
  return (
    <div className="flex-space-between gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-center">
      <div className="[&>svg]:size-10">{icon}</div>
      <span className="flex-1 text-left font-medium text-lg">{time}</span>
      <span className="text-preset-7">{temp}°</span>
    </div>
  );
}
