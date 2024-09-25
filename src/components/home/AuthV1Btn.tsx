import useV1Me from "@/hooks/useV1Me";
import { url } from "@/lib/constants";
import axios from "axios";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogIn, User } from "lucide-react";

export default function AuthV1Btn() {
  const { me } = useV1Me();

  const onLogout = async () => {
    await axios
      .create({ withCredentials: true })
      .patch(`${url}/v1/signout`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/login";
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      });
  };

  let content;
  if (me) {
    content = (
      <>
        <DropdownMenuItem asChild>
          <Link to="/me">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </>
    );
  } else {
    content = (
      <>
        <DropdownMenuItem asChild>
          <Link to="/login">Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/register">Register</Link>
        </DropdownMenuItem>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="" size={"sm"} variant={"link"}>
          {me ? <User className="size-4" /> : <LogIn className="w-4 h-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{content}</DropdownMenuContent>
    </DropdownMenu>
  );
}
