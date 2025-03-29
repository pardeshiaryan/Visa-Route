"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries, passportTypes, visaTypes } from "@/lib/utils";
// import { useCountryStore } from "@/st
// ores/countryStore"; // adjust the path as needed
import { useCountryStore } from "@/lib/zustand";
// Extend the form schema to include passport_type and visa_type
const formSchema = z.object({
  startCountry: z.string().min(2, {
    message: "Start country must be at least 2 characters.",
  }),
  endCountry: z.string().min(2, {
    message: "End country must be at least 2 characters.",
  }),
  passport_type: z.string(),
  visa_type: z.string(),
});

export function VisaPredictionForm() {
  // Destructure setter functions from the zustand store
  const { setStartCountry, setEndCountry, setPassportType, setVisaType } = useCountryStore();
  
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form with default values including the new fields
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startCountry: "",
      endCountry: "",
      passport_type: passportTypes[0],
      visa_type: visaTypes[0],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Update the zustand store so that values persist in local storage
    setStartCountry(values.startCountry);
    setEndCountry(values.endCountry);
    setPassportType(values.passport_type);
    setVisaType(values.visa_type);

    setLoading(true);
    setOutput(null);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/visa-info/?passport_country=${encodeURIComponent(
          values.startCountry
        )}&destination_country=${encodeURIComponent(values.endCountry)}`
      );

      const data = await response.json();

      if (response.ok) {
        setOutput(
          `Visa requirement for ${values.startCountry} → ${values.endCountry}: ${data.visa_requirement}`
        );
      } else {
        setError(data.error || "Failed to fetch visa data.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Start Country */}
        <FormField
          control={form.control}
          name="startCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    // setStartCountry(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Country */}
        <FormField
          control={form.control}
          name="endCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    // setEndCountry(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passport Type */}
        <FormField
          control={form.control}
          name="passport_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    // setPassportType(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select passport type" />
                  </SelectTrigger>
                  <SelectContent>
                    {passportTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Visa Type */}
        <FormField
          control={form.control}
          name="visa_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visa Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    // setVisaType(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Show Visa Info"}
        </Button>
      </form>

      {/* Output Section */}
      {output && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          <h3 className="text-lg font-semibold">Visa Information:</h3>
          <p>{output}</p>
        </div>
      )}

      {/* Error Section */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          <h3 className="text-lg font-semibold">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </Form>
  );
}
