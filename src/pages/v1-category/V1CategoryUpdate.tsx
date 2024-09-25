import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { url } from "@/lib/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { useV1 } from "@/hooks/useV1";
import { CategorySchema } from "@/v1Schemas";

type CreateCategoryForm = z.infer<typeof CategorySchema>;

export default function V1CategoryUpdate() {
  const { id } = useParams();
  const { singleCat, getCatById, loadSingleCat, errSingleCat } = useV1();
  const [pending, setPending] = useState(false);

  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { name: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCatById(id);
    }
  }, [getCatById, id]);

  useEffect(() => {
    if (singleCat) {
      const { name } = singleCat;
      form.reset({ name });
    }
  }, [singleCat, form]);

  const onSubmit = async (values: CreateCategoryForm) => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/v1/category/${id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/category");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  let content;
  if (loadSingleCat) {
    content = <LoaderBounce />;
  } else if (errSingleCat) {
    content = <Err>{errSingleCat}</Err>;
  } else {
    content = (
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
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Update Category</h2>
      {content}
    </div>
  );
}
