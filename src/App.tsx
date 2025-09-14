import Header from "./components/layout/Header";

export default function App() {
  return (
    <div className="wrapper px-4 sm:px-6">
      <Header />
      <h1 className="span-full my-16 text-center text-preset-2">
        How&rsquo;s the sky looking today?
      </h1>
    </div>
  );
}
