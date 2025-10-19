"use client";

import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import type * as React from "react";
import DropdownIcon from "@/assets/images/icon-dropdown.svg?react";

import { cn } from "@/lib/utils";

function Select({ ...props }: React.ComponentProps<typeof Root>) {
  return <Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof Group>) {
  return <Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof Value>) {
  return <Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <Trigger
      className={cn(
        "flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-border px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[size=default]:h-9 data-[size=sm]:h-8 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-size={size}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <Icon asChild>
        <DropdownIcon className="size-4" />
      </Icon>
    </Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        align={align}
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[13rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
          position === "popper" &&
            "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1",
          className
        )}
        data-slot="select-content"
        position={position}
        {...props}
      >
        <Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </Viewport>
      </Content>
    </Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
      data-slot="select-label"
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-2 text-base outline-hidden focus:bg-secondary focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      data-slot="select-item"
      {...props}
    >
      <ItemText>{children}</ItemText>
    </Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("-mx-1 pointer-events-none my-1 h-px bg-border", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
