"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch } from "@/lib/hooks";
import axiosInstance from "@/lib/api/axiosInstance";
import { login } from "@/lib/features/auth/userSlice";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(4, { message: "Minimum of 4 characters" }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Assuming the login route is `/api/users/login`
      const response = await axiosInstance.post("/api/users/login", values);

      // Extracting the userId and token from the response
      const { userId, token } = response.data;

      // Dispatch login action with userId and token
      dispatch(login({ id: userId, token }));

      // Display success message
      toast({
        title: "Login Success!",
        description: `Welcome back!`,
      });

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error: any) {
      console.error("Login failed", error);

      // Extract error message and show it in toast
      toast({
        title: "Login Failed!",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="w-[30rem] h-16">
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="w-[30rem] h-16">
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          className="w-3/4 bg-yellow-400 h-14 text-lg"
        >
          Login
        </Button>
      </form>
      <Separator className="my-20" />
      <div className="p-2 flex items-center flex-col mt-4">
        <Button className="bg-yellow-400 flex items-center h-12 text-base w-[20rem]">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="google icon"
            className="h-10"
          />
          Login with Google
        </Button>
      </div>
    </Form>
  );
}
