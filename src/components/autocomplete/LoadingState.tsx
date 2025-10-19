import { Spinner } from "../ui/spinner";

export default function LoadingState() {
  return (
    <div className="absolute z-10 mt-2.5 h-[55px] w-full rounded-xl border border-secondary bg-popover p-2 text-popover-foreground">
      <div
        aria-live="polite"
        className="flex items-center gap-y-2.5 px-2 py-2.5"
      >
        <Spinner />
        <span className="ml-2 font-medium text-base">Search in progress</span>
      </div>
    </div>
  );
}
