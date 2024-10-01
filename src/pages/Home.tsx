import HomeTools from "@/components/HomeTools";
import { Button } from "@/components/ui/button";
import { useV1 } from "@/hooks/useV1";
import { Link } from "react-router-dom";

export default function Home() {
  const { me } = useV1();

  return (
    <section className="py-24">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-semibold text-center">
            Welcome <br /> <span className="break-all text-primary">{me?.email}</span>
          </h1>
          <p className="text-center">
            Using Vite for a React frontend, with a Node.js and Express backend connected to a MongoDB database, and
            hosting the project on Vercel.
          </p>
          <Button asChild>
            <Link to="/product">Get Started</Link>
          </Button>
          <HomeTools />
        </div>
      </div>
    </section>
  );
}
