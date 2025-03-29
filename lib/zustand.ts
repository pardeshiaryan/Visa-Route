import { create } from "zustand";
import { persist } from "zustand/middleware";
import { passportTypes ,visaTypes } from "./utils";

interface CountryStore {
  startCountry: string;
  endCountry: string;
  passport_type: string;
  setPassportType: (passportType: string) => void;
  visa_type: string;
  setVisaType: (visaType: string) =>
  void; 



  setStartCountry: (country: string) => void;
  setEndCountry: (country: string) => void;
}

export const useCountryStore = create(
  persist<CountryStore>(
    (set) => ({
      startCountry: "",
      endCountry: "",
      passport_type: passportTypes[0],
      visa_type: visaTypes[0],
      setVisaType: (visaType) => set({ visa_type: visaType }),
      setPassportType: (passportType) => set({ passport_type: passportType }),
      setStartCountry: (country) => set({ startCountry: country }),
      setEndCountry: (country) => set({ endCountry: country }),
    }),
    {
      name: "country-store", // Key for localStorage
    }
  )
);
