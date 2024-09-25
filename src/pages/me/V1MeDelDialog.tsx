import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { url } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function V1MeDelDialog() {
  const [pending, setPending] = useState(false);
  const onDelete = () => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .delete(`${url}/v1/me`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/v1/login";
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"} type="button">
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle>Delete your account, Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <div className="space-x-1">
            <Button disabled={pending} onClick={onDelete} variant={"destructive"} size={"sm"}>
              {pending ? "Loading.." : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"} size={"sm"}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
