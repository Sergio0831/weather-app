import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

export type UnitOptionGroupProps = {
  label: string;
  options: [string, string];
  isMetric: boolean;
};

export default function UnitOptionGroup({
  label,
  options,
  isMetric,
}: UnitOptionGroupProps) {
  return (
    <>
      <DropdownMenuLabel className="mb-2">{label}</DropdownMenuLabel>
      <DropdownMenuGroup className="grid gap-y-1">
        <DropdownMenuCheckboxItem checked={isMetric}>
          {options[0]}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={!isMetric}>
          {options[1]}
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    </>
  );
}
