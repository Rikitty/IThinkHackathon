"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAppSelector } from "@/lib/hooks";
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

const editSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }),
    location: z.string({ required_error: "Location is required" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    imageUrl: z.string().optional(),
    userId: z.number(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before the start date",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof editSchema>;

export default function EditForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      imageUrl: "",
      userId: userId ?? undefined,
    },
  });

  // Fetch the event data by ID
  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axiosInstance.get(`/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const event = response.data;
        if (event.userId !== userId) {
          // Redirect or show a message if the user is not the owner
          toast({
            title: "Unauthorized",
            description: "You are not authorized to edit this event.",
          });
          router.push("/");
        } else {
          // Populate the form with the fetched event data
          form.reset({
            title: event.title,
            location: event.location,
            description: event.description,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            imageUrl: event.imageUrl,
            userId: userId ?? undefined,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch event data.",
        });
      }
    }
    fetchEvent();
  }, [eventId, token, userId, form, router, toast]);

  async function onSubmit(values: FormValues) {
    try {
      const response = await axiosInstance.put(`/events/${eventId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Event Updated!",
        description: `Event ${response.data.title} has been updated.`,
      });
      router.push(`/events/${eventId}`);
    } catch (error) {
      toast({
        title: "Event Update Failed!",
        description: `The event could not be updated: ${error}`,
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
          <Button type="submit">Update Event</Button>
        </div>
      </form>
    </Form>
  );
}
