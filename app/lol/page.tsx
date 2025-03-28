"use client";

import { useEffect, useState } from "react";
import { useCountryStore } from "@/lib/zustand";

const Page = () => {
  const startCountry = useCountryStore((state) => state.startCountry);
  const endCountry = useCountryStore((state) => state.endCountry);
  const setStartCountry = useCountryStore((state) => state.setStartCountry);
  const setEndCountry = useCountryStore((state) => state.setEndCountry);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Prevents hydration issues

  return (
    <div>
      <h1>Hello Testing Login Page</h1>
      <button
        onClick={() => {
          setStartCountry("India");
          setEndCountry("Sri Lanka");
        }}
      >
        Set Country
      </button>
      <h1>{startCountry || "Not Defined"}</h1>
      <h1>{endCountry || "Not Defined"}</h1>
    </div>
  );
};

export default Page;
