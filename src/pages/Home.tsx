import { useV1 } from "@/hooks/useV1";

export default function Home() {
  const { me } = useV1();
  if (me) {
    console.log(me);
  }
  return <div>Home</div>;
}
