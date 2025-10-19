import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import CheckIcon from "@/assets/images/icon-checkmark.svg?react";
import { cn } from "@/lib/utils";

function DropdownMenu({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: ComponentProps<typeof Portal>) {
  return <Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: ComponentProps<typeof Trigger>) {
  return <Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-xl border border-border bg-popover px-2 py-1.5 text-popover-foreground shadow-sm data-[state=closed]:animate-out data-[state=open]:animate-in",
          className
        )}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
}

function DropdownMenuGroup({ ...props }: ComponentProps<typeof Group>) {
  return <Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ComponentProps<typeof Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <Item
      className={cn(
        "data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-[0.5rem] px-2.5 py-2 font-medium text-base outline-none outline-hidden transition-all focus:bg-secondary data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof CheckboxItem>) {
  return (
    <CheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-[0.5rem] px-2 py-2.5 font-medium text-base outline-hidden transition-colors focus:bg-secondary data-[disabled]:pointer-events-none data-[state='checked']:bg-secondary data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <CheckIcon className="size-3.5" />
        </ItemIndicator>
      </span>
    </CheckboxItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  inset?: boolean;
}) {
  return (
    <Label
      className={cn(
        "pt-1.5 pl-2 font-medium text-muted text-sm data-[inset]:pl-8",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
};
