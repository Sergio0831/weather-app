import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-14 min-w-0 rounded-xl bg-popover px-6 py-4 font-medium text-lg text-neutral-200 outline-none transition-[color,box-shadow] placeholder:text-inherit hover:bg-secondary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-3",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
