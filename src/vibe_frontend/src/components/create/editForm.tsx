"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAppSelector } from "@/lib/hooks";
import { startOfToday, endOfToday } from "date-fns";
import { CalendarIcon, ImageIcon, MapIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
import { Separator } from "../ui/separator";

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
      startDate: startOfToday(),
      endDate: endOfToday(),
      imageUrl: "",
      userId: userId ?? undefined,
    },
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axiosInstance.get(`/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const event = response.data;
        if (event.userId !== userId) {
          toast({
            title: "Unauthorized",
            description: "You are not authorized to edit this event.",
          });
          router.push("/");
        } else {
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
      const response = await axiosInstance.put(`/api/events/${eventId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Event Updated!",
        description: `Event ${response.data.title} has been updated.`,
      });
      router.push(`/dashboard`);
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
              <FormLabel className="text-white">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Event title"
                  className="w-full p-2 bg-transparent text-white rounded-md placeholder-gray-400 border-transparent hover:border-white focus:border-white transition duration-300"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the event"
                  className="w-full p-2 bg-transparent text-white rounded-md placeholder-gray-400 border-transparent hover:border-white focus:border-white transition duration-300"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-rows-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full p-2 text-left bg-transparent text-white rounded-md placeholder-gray-400 border-2 border-yellow-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MM/dd/yyyy")
                          ) : (
                            <span>Pick a start date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full p-2 text-left bg-transparent text-white rounded-md placeholder-gray-400 border-2 border-yellow-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MM/dd/yyyy")
                          ) : (
                            <span>Pick an end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <MapIcon className="text-yellow-500 mr-2" />
                    <Input
                      placeholder="Event location"
                      className="w-full p-2 text-left bg-transparent text-white rounded-md placeholder-gray-400 border-2 border-yellow-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <Separator />
        <div className="flex justify-center mt-8">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"default"}
                className="text-yellow-500 bg-transparent hover:bg-transparent hover:text-white hover:underline"
              >
                <ImageIcon className="size-8" /> Upload an Image
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Image URL (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        className="w-full p-2 text-left bg-transparent text-white rounded-md placeholder-gray-400 border-2 border-yellow-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Separator />

        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="w-1/3 p-2 text-lg font-bold text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black hover:underline border-2 border-yellow-500 rounded-md"
          >
            Update Event
          </Button>
        </div>
      </form>
    </Form>
  );
}
