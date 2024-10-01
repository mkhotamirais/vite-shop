import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { url } from "@/lib/constants";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/v1Schemas";
import { Loader2 } from "lucide-react";

type RegisterFormSchema = z.infer<typeof RegisterSchema>;

export default function V1Register() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confPassword: "" },
  });

  const onSubmit = async (values: RegisterFormSchema) => {
    setPending(true);
    axios
      .post(`${url}/v1/signup`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="max-w-md border rounded-xl p-6 mx-auto my-12">
      <h1 className="text-xl font-semibold my-2">V1 REGISTER</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="Your name" onFocus={(e) => e.target.select()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={pending}
                    {...field}
                    placeholder="example@gmail.com"
                    onFocus={(e) => e.target.select()}
                  />
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
                  <Input
                    type="password"
                    disabled={pending}
                    {...field}
                    placeholder="******"
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={pending}
                    {...field}
                    placeholder="******"
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit" className="w-full">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </form>
        <div className="flex justify-center mt-4">
          <Button variant={"link"} asChild>
            <Link to="/v1/login">Already have an account?</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
