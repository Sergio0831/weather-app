import IconLoading from "@/assets/images/icon-loading.svg?react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <IconLoading
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
