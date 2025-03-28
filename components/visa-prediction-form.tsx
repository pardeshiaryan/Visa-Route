"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/utils";
// import {useCou}
const formSchema = z.object({
  startCountry: z.string().min(2, {
    message: "Start country must be at least 2 characters.",
  }),
  endCountry: z.string().min(2, {
    message: "End country must be at least 2 characters.",
  }),
});

export function VisaPredictionForm() {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startCountry: "",
      endCountry: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setOutput(null);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/visa-info/?passport_country=${values.startCountry}&destination_country=${values.endCountry}`
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country or type" />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country or type" />
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
