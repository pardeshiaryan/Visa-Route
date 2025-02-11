"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  nationality: z.string().min(2, {
    message: "Nationality must be at least 2 characters.",
  }),
  age: z
    .number()
    .min(18, {
      message: "You must be at least 18 years old.",
    })
    .max(120, {
      message: "Age must be less than 120.",
    }),
  visaType: z.string({
    required_error: "Please select a visa type.",
  }),
  purpose: z
    .string()
    .min(10, {
      message: "Purpose must be at least 10 characters.",
    })
    .max(500, {
      message: "Purpose must not exceed 500 characters.",
    }),
})

export function VisaPredictionForm() {
  const [prediction, setPrediction] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationality: "",
      age: undefined,
      visaType: "",
      purpose: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the form data to your backend API
    // For this example, we'll just set a mock prediction
    setPrediction("Based on the provided information, your visa application has a 75% chance of approval.")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter your nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visaType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visa Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a visa type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Visit</FormLabel>
              <FormControl>
                <Textarea placeholder="Briefly describe the purpose of your visit" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Provide a brief description of why you're applying for this visa.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Predict Visa Outcome</Button>
      </form>
      {prediction && (
        <div className="mt-8 p-4 bg-secondary text-secondary-foreground rounded-md">
          <h3 className="text-lg font-semibold mb-2">Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </Form>
  )
}

