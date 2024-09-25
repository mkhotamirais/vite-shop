import React from "react";
import { BounceLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

export const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="max-w-5xl mx-auto px-3 h-full">{children}</section>
);

export const LandingTitle = ({ title, description }: { title: string; description: string }) => (
  <div className="leading-relaxed">
    <h1 className="text-3xl font-bold mb-2 uppercase">{title}</h1>
    <p className="text-muted-foreground max-w-2xl">{description}</p>
  </div>
);

export const LoaderBounce = () => (
  <div className="flex items-center justify-center mt-12">
    <BounceLoader />
  </div>
);

export const Err = ({ children, isLoginBtn = true }: { children: React.ReactNode; isLoginBtn?: boolean }) => {
  const { pathname } = useLocation();

  const path1 = pathname.split("/")[1];

  let to: string = "";
  if (path1 === "v2-mongodb") {
    to = "/v2-mongodb/login";
  }
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-12 italic text-red-500">
      {children}
      {isLoginBtn && (
        <Button size={"sm"}>
          <Link to={to}>Login</Link>
        </Button>
      )}
    </div>
  );
};
