import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect, useState } from "react";
import moment from "moment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { url } from "@/lib/constants";
import V1MeDelDialog from "./V1MeDelDialog";
import { useV1 } from "@/hooks/useV1";
import { UpdateUserSchema } from "@/v1Schemas";

type UpdateMeForm = z.infer<typeof UpdateUserSchema>;

export default function V1Me() {
  const { me, getMe, loadMe, errMe } = useV1();
  const [changePass, setChangePass] = useState(false);
  const [pending, setPendig] = useState(false);

  useEffect(() => {
    getMe();
  }, [getMe]);

  const form = useForm<UpdateMeForm>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: { name: "", email: "", password: "", confPassword: "", role: me?.role },
  });

  useEffect(() => {
    if (me) {
      const { name, email, role } = me;
      form.reset({ name, email, password: "", confPassword: "", role });
    }
  }, [form, me]);

  const noInputData = [
    { label: "ID", value: me?._id },
    { label: "Created Time", value: moment(me?.createdAt).fromNow() },
    { label: "Updated Time", value: moment(me?.updatedAt).fromNow() },
  ];

  const onSubmit = (values: UpdateMeForm) => {
    setPendig(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/v1/me`, values)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPendig(false));
  };

  if (loadMe) return <LoaderBounce />;
  if (errMe) return <Err>{errMe}</Err>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Detail {me?.name}</h2>
      <div>
        {noInputData.map((item, i) => (
          <div key={i} className="grid grid-cols-2 p-1 text-xs border-b rounded">
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} />
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
                  <Input disabled={pending} type="email" {...field} />
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
                <Select disabled={true} value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
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
          <div className="flex gap-1 justify-between items-center">
            <Button disabled={pending} type="submit">
              {pending ? "Loading.." : "Save"}
            </Button>
            <V1MeDelDialog />
          </div>
        </form>
      </Form>
    </div>
  );
}
