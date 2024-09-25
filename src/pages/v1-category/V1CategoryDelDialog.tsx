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
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { url } from "@/lib/constants";
import { useState } from "react";
import { useV1, V1Categories } from "@/hooks/useV1";

export default function V1CategoryDelDialog({ item }: { item: V1Categories }) {
  const [pending, setPending] = useState(false);
  const { getCat } = useV1();
  const onDel = async () => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .delete(`${url}/v1/category/${item._id}`)
      .then((res) => {
        toast.success(res.data.message);
        getCat();
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <FaTrashCan className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Delete {item?.name}, are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="space-x-1">
            <Button disabled={pending} onClick={onDel} size="sm" variant="destructive">
              {pending ? "Loading.." : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button disabled={pending} size="sm" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
