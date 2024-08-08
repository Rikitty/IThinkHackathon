"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { startOfToday, endOfToday } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAppSelector } from "@/lib/hooks";

const createSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }),
    location: z.string({ required_error: "Destination must be specified" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.date({ required_error: "Start date required" }),
    endDate: z.date({ required_error: "End date required" }),
    imageUrl: z.string().optional(),
    userId: z.number(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before the start date",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof createSchema>;

export default function CreateForm() {
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token);
  const form = useForm<FormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      startDate: startOfToday(),
      endDate: endOfToday(),
      imageUrl: "",
      userId: userId ?? undefined,
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: FormValues) {
    try {
      const response = await axiosInstance.post("/events", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Event Created!",
        description: `Event ${response.data.title} has been created.`,
      });
    } catch (error) {
      console.error("Event Creation failed", error);
      toast({
        title: "Event Creation Failed!",
        description: `The response JSON ${JSON.stringify(values)} and ${error}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the event"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center mt-8">
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Form>
  );
}
