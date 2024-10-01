import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useBasic } from "@/hooks/useBasic";
import { Button } from "../ui/button";

const navVer1 = [
  { href: "/", label: "home" },
  { href: "/product", label: "product" },
  { href: "/category", label: "category" },
  { href: "/tag", label: "tag" },
  { href: "/user", label: "user" },
];

export default function Navbar({ className }: { className?: string }) {
  const [nav, setNav] = useState<{ href: string; label: string }[]>([]);
  const { pathname } = useLocation();
  const { nav: navBtn, closeNav } = useBasic();

  const path1: string = pathname.split("/")[1];

  const onNavClick = () => {
    if (nav) {
      closeNav();
    }
  };

  useEffect(() => {
    setNav(navVer1);
  }, [path1]);

  return (
    <nav
      className={`${className} ml-0 sm:ml-6 ${
        navBtn ? "scale-y-100" : "scale-y-0"
      } sm:scale-y-100 origin-top transition bg-background sm:bg-inherit text-[0.9rem] fixed sm:static top-16 inset-x-0 p-3 sm:p-0 border-b rounded-b sm:border-none`}
    >
      <div className="flex flex-col sm:flex-row">
        {nav.map((item, i) => (
          <Link
            onClick={onNavClick}
            key={i}
            to={item.href}
            className={`${
              path1 === item.href.split("/")[1] ? "text-primary" : ""
            } capitalize text-center border-b sm:border-none block hover:text-primary px-3 sm:px-4 py-3 sm:py-0 hover:bg-muted sm:hover:bg-inherit rounded transition`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export const NavBtn = () => {
  const { nav, openNav, closeNav } = useBasic();
  // const { pathname } = useLocation();
  // const path1 = pathname.split("/")[1];
  const onClick = () => {
    if (nav) {
      closeNav();
    } else openNav();
  };

  return (
    <Button onClick={onClick} size={"icon"} variant={"ghost"} className="static sm:hidden">
      <div className={`${nav ? "rotate-180" : ""} transition`}>
        {nav ? <FaXmark className="size-5" /> : <FaBars className="size-5" />}
      </div>
    </Button>
  );
};
