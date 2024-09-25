import { Button } from "@/components/ui/button";
import { useV1 } from "@/hooks/useV1";
import { Link } from "react-router-dom";

export default function Home() {
  const { me } = useV1();

  return (
    <div className="py-12">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold">Welcome {me?.name}</h1>
        <Button asChild>
          <Link to="/product">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
