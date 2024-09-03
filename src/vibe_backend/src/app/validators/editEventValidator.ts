import { z } from "zod";

export default class EditEventValidator {
  static schema = z.object({
    title: z.string({ required_error: "Title is required" }),
    location: z.string({ required_error: "Destination must be specified" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.date({ required_error: "Start date required" }),
    endDate: z.date({ required_error: "End date required" }),
    imageUrl: z.string().optional(),
    userId: z.number(),
  }).refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before the start date",
    path: ["endDate"],
  });

  static validate = this.schema.safeParse;
}