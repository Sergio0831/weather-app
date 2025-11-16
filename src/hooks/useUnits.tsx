import useLocalStorageState from "use-local-storage-state";

export function useUnits() {
  const [units, setUnits] = useLocalStorageState<"metric" | "imperial">(
    "units",
    {
      defaultValue: "metric",
    }
  );

  return { units, setUnits };
}
