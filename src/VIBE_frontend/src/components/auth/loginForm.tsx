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
      const response = await axiosInstance.post("/login", values);
      dispatch(login(response.data.token));
      toast({
        title: "Login Success!",
        description: `The response JSON ${values} and ${response.data.token}`,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: "Login Failed!",
        description: `The response JSON ${values} and ${error}`,
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
              <FormControl>
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
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={"lg"} className="w-3/4">
          Login
        </Button>
      </form>
      <Separator className="my-6" />
      <div className="p-2 flex items-center flex-col">
        <Button>Login with Google</Button>
      </div>
    </Form>
  );
}
