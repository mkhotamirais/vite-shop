import React from "react";
import { BounceLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const LandingTitle = ({ title, description }: { title: string; description: string }) => (
  <div className="leading-relaxed">
    <h1 className="text-3xl font-bold mb-2 uppercase">{title}</h1>
    <p className="text-muted-foreground max-w-2xl">{description}</p>
  </div>
);

export const LoaderBounce = () => (
  <div className="flex items-center justify-center mt-12">
    <BounceLoader color={"hsl(var(--primary))"} />
  </div>
);

export const Err = ({ children, isLoginBtn = true }: { children: React.ReactNode; isLoginBtn?: boolean }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-12 italic text-red-500">
      {children}
      {isLoginBtn && (
        <Button size={"sm"} asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
      )}
    </div>
  );
};
