import SearchIcon from "@/assets/images/icon-search.svg?react";
import { Input } from "../ui/input";

export default function SearchInput() {
  return (
    <div className="relative w-full text-neutral-200">
      <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-6 size-5" />
      <Input
        className="w-full pl-15 focus-visible:ring-offset-background md:w-[526px]"
        placeholder="Search for a place..."
        type="search"
      />
    </div>
  );
}
