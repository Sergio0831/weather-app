import UnitSwitcher from "../custom/UnitSwitcher";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="span-full mt-4 flex-space-between sm:mt-6 md:mt-12">
      <Logo />
      <UnitSwitcher />
    </header>
  );
}
