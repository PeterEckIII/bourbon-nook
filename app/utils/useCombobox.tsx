import React, { createContext, useContext, useEffect, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { Bottle } from "~/components/UI/Combobox/Combobox";
import type { LoaderData } from "~/routes/services/combo";

type BottleContext = {
  value: Bottle | null;
  setValue: React.Dispatch<React.SetStateAction<Bottle | null>>;
  fetcher: TypedFetcherWithComponents<LoaderData>;
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ComboContext = createContext<BottleContext | null>(null);

export const ComboProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [value, setValue] = useState<Bottle | null>(null);
  const fetcher = useTypedFetcher<LoaderData>();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    function getInitialData() {
      fetcher.load(`/services/combo`);
    }
    getInitialData();
  }, [fetcher]);

  useEffect(() => {
    function getFilteredBottles() {
      fetcher.load(`/services/combo?query=${query}`);
    }
    getFilteredBottles();
  }, [query, fetcher]);

  const comboValue: BottleContext = {
    fetcher,
    value,
    setValue,
    query,
    handleQueryChange,
  };

  return (
    <ComboContext.Provider value={comboValue}>{children}</ComboContext.Provider>
  );
};

export default function useCombobox() {
  const context = useContext(ComboContext);
  if (context === undefined) {
    throw new Error(
      `useCombobox must be used within a ComboProvider component`
    );
  }

  return context;
}
