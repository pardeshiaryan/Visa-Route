import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CountryStore {
  startCountry: string;
  endCountry: string;
  setStartCountry: (country: string) => void;
  setEndCountry: (country: string) => void;
}

export const useCountryStore = create(
  persist<CountryStore>(
    (set) => ({
      startCountry: "",
      endCountry: "",
      setStartCountry: (country) => set({ startCountry: country }),
      setEndCountry: (country) => set({ endCountry: country }),
    }),
    {
      name: "country-store", // Key for localStorage
    }
  )
);
