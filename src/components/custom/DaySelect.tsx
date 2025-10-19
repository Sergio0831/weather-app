import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type DaySelectProps = {
  value: string;
  onChange: (value: string) => void;
  days: string[];
};

export default function DaySelect({ days, onChange, value }: DaySelectProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="px-4 py-2 focus-visible:ring-offset-popover">
        <SelectValue placeholder="Select a day" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {days.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
