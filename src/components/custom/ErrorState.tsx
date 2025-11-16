import ErrorIcon from "@/assets/images/icon-error.svg?react";
import RefreshIcon from "@/assets/images/icon-refresh.svg?react";
import { Button } from "../ui/button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title,
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="grid justify-center gap-6 pt-10">
      <div className="flex-center">
        <ErrorIcon className="size-12" />
      </div>
      <h1 className="text-center text-preset-2 tracking-wide">{title}</h1>
      <p className="text-center font-medium text-preset-5">{message}</p>
      <Button className="w-fit justify-self-center" onClick={onRetry} size="lg">
        <RefreshIcon className="size-4" />
        Retry
      </Button>
    </div>
  );
}
