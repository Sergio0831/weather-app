import useLocalStorageState from "use-local-storage-state";

export function useSelectedCity() {
  const [selectedCity, setSelectedCity] = useLocalStorageState<{
    lat: number;
    lon: number;
    name: string;
  } | null>("selected-city", { defaultValue: null });

  return { selectedCity, setSelectedCity };
}
