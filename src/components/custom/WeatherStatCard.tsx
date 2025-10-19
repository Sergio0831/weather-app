export type WeatherStatCardProps = {
  label: string;
  value: string | number;
};

export default function WeatherStatCard({
  label,
  value,
}: WeatherStatCardProps) {
  return (
    <div className="grid w-full gap-6 rounded-xl border border-border bg-popover p-5">
      <h3 className="text-preset-6">{label}</h3>
      <span className="text-preset-3">{value}</span>
    </div>
  );
}
