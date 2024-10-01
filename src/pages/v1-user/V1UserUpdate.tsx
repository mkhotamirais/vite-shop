import { z } from "zod";

import { useV1 } from "@/hooks/useV1";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Err, LoaderBounce } from "@/components/Wrapper";
import axios from "axios";
import { url } from "@/lib/constants";
import { toast } from "sonner";
import { UpdateUserSchema } from "@/v1Schemas";
import { Loader2 } from "lucide-react";

type UpdateUserForm = z.infer<typeof UpdateUserSchema>;

export default function V1UserUpdate() {
  const { id } = useParams();
  const { getUser, user, loadUser, errUser } = useV1();
  const [pending, setPending] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const navigate = useNavigate();

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: { name: "", email: "", password: "", confPassword: "", role: user?.role },
  });

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [getUser, id]);

  useEffect(() => {
    if (user) {
      const { name, email, role } = user;
      form.reset({ name, email, password: "", confPassword: "", role });
    }
  }, [user, form]);

  const onSubmit = (values: UpdateUserForm) => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/v1/user/${id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/user");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  let content;
  if (loadUser) content = <LoaderBounce />;
  else if (errUser) content = <Err>{errUser}</Err>;
  else
    content = (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="your name" />
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
                  <Input type="email" disabled={pending} {...field} placeholder="example@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={pending}
            onClick={() => setChangePass((prev) => !prev)}
            type="button"
            variant={"outline"}
            size={"sm"}
          >
            Change Password
          </Button>
          <div className={`${changePass ? "block" : "hidden"} transition space-y-3`}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={pending} {...field} placeholder="******" />
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
                    <Input type="password" disabled={pending} {...field} placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  disabled={pending}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update
          </Button>
        </form>
      </Form>
    );

  return (
    <div className="max-w-xl mx-auto py-4">
      <h2 className="text-lg font-semibold mb-2 text-primary">Update User</h2>
      {content}
    </div>
  );
}
