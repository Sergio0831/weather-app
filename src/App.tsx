import SearchInput from "./components/custom/SearchInput";
import Header from "./components/layout/Header";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="wrapper px-4 sm:px-6">
      <Header />
      <h1 className="span-full my-8 text-center text-preset-2 tracking-wide">
        How&rsquo;s the sky looking today?
      </h1>
      <div className="span-full flex-center">
        <form className="flex flex-col gap-x-4 gap-y-3 max-md:w-full sm:flex-row">
          <SearchInput />
          <Button
            className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-3 focus-visible:ring-offset-background"
            size="xl"
            type="submit"
            variant="accent"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
