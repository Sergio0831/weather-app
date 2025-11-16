import { cn } from "@/lib/utils";
import UnitSwitcher from "../custom/UnitSwitcher";
import Logo from "./Logo";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn("mt-4 flex-space-between sm:mt-6 md:mt-12", className)}
    >
      <Logo />
      <UnitSwitcher />
    </header>
  );
}
