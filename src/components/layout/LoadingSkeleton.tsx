import DropdownIcon from "@/assets/images/icon-dropdown.svg?react";
import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-8 sm:grid-cols-8 md:grid-cols-12">
      {/* Left block */}
      <div className="span-full md:col-span-8">
        <div className="mb-6 grid gap-8 md:mb-12">
          <Skeleton className="h-[280px] flex-center rounded-[1.25rem]">
            <div className="flex flex-col items-center">
              <div className="loader" />
              <h2 className="mt-3 text-preset-6">Loading...</h2>
            </div>
          </Skeleton>
          <div className="grid-cols gap-4 sm:gap-5 md:gap-6">
            {["Feels Like", "Humidity", "Wind", "Precipitation"].map(
              (label) => (
                <Skeleton
                  className="grid h-[120px] w-full gap-6 rounded-xl border border-border p-5"
                  key={label}
                >
                  <h3 className="text-preset-6">{label}</h3>
                  <span>-</span>
                </Skeleton>
              )
            )}
          </div>
        </div>
        <div className="grid gap-4">
          <h3 className="text-preset-5">Daily forecast</h3>
          <div className="grid-cols-sm gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton
                className="h-[170px] rounded-[1.25rem] border border-border"
                key={`${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Right block */}
      <div className="span-full md:col-span-4">
        <div className="w-full rounded-[1.25rem] bg-popover px-4 py-5 pr-2 sm:px-6 sm:py-6">
          <div className="mb-4 flex-space-between flex-wrap gap-2">
            <h3 className="text-preset-5">Hourly forecast</h3>
            <Skeleton className="h-9 flex-space-between gap-3 rounded-lg px-4 py-2">
              <span>-</span>
              <DropdownIcon className="size-4" />
            </Skeleton>
          </div>
          <div className="grid gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton className="h-15 rounded-lg" key={`${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}
