import useLocalStorageState from "use-local-storage-state";
import DropdownIcon from "@/assets/images/icon-dropdown.svg?react";
import UnitsIcon from "@/assets/images/icon-units.svg?react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UnitOptionGroup from "./UnitOptionGroup";

export default function UnitSwitcher() {
  const [units, setUnits] = useLocalStorageState<"metric" | "imperial">(
    "units",
    {
      defaultValue: "metric",
    }
  );

  const isMetric = units === "metric";

  const handleUnitChange = () => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Change units"
          className="focus-visible:ring-offset-[3px] focus-visible:ring-offset-background [&[data-state=open]>svg]:rotate-180"
          size="lg"
          type="button"
        >
          <UnitsIcon className="size-4" />
          Units
          <DropdownIcon className="size-4 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[214px]" sideOffset={10}>
        <DropdownMenuItem
          className="mb-1 cursor-pointer hover:bg-secondary focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-3 focus-visible:ring-offset-popover"
          onClick={handleUnitChange}
        >
          Switch to {isMetric ? "Imperial" : "Metric"}
        </DropdownMenuItem>
        <UnitOptionGroup
          isMetric={isMetric}
          label="Temperature"
          options={["Celsius (°C)", "Fahrenheit (°F)"]}
        />
        <DropdownMenuSeparator />
        <UnitOptionGroup
          isMetric={isMetric}
          label="Wind Speed"
          options={["km/h", "mph"]}
        />
        <DropdownMenuSeparator />
        <UnitOptionGroup
          isMetric={isMetric}
          label="Precipitation"
          options={["Millimeters (mm)", "Inches (in)"]}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
