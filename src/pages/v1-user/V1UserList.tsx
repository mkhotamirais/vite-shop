import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { V1Users } from "@/hooks/useV1";
import V1UserDelDialog from "./V1UserDelDialog";
import { Badge } from "@/components/ui/badge";

export default function V1UserList({ item }: { item: V1Users }) {
  return (
    <div className="group relative border p-4 rounded-lg overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="capitalize">{item.name}</div>
        <Badge>{item.role}</Badge>
        <div>{item.email}</div>
      </div>
      <div className="scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-0 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/user-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V1UserDelDialog item={item} />
      </div>
    </div>
  );
}
