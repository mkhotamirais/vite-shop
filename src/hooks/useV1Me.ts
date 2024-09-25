import { useEffect } from "react";
import { useV1 } from "./useV1";

export default function useV1Me() {
  const { me, getMe, loadMe, errMe } = useV1();

  useEffect(() => {
    getMe();
  }, [getMe]);

  return { me, loadMe, errMe };
}
