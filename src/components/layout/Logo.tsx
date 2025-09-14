import LogoIcon from "@/assets/images/logo.svg?react";

export default function Logo() {
  return (
    <div className="flex-center gap-x-2.5">
      <LogoIcon className="size-7 sm:size-10" />
      <span className="select-none font-heading sm:text-[1.375rem]">
        Weather Now
      </span>
    </div>
  );
}
