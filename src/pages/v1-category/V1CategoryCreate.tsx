import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { url } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { CategorySchema } from "@/v1Schemas";

type CreateCategoryForm = z.infer<typeof CategorySchema>;

export default function V1CategoryCreate() {
  const [pending, setPending] = useState(false);
  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { name: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: CreateCategoryForm) => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .post(`${url}/v1/category`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/category");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Create Category</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="Category name" onFocus={(e) => e.target.select()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            {pending ? "Loading.." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
