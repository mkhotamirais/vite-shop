import { Err, LoaderBounce } from "@/components/Wrapper";
import useV1Me from "@/hooks/useV1Me";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function V1Protected() {
  const { loadMe, errMe } = useV1Me();

  if (loadMe) return <LoaderBounce />;
  if (errMe) return <Err>{errMe}</Err>;

  return <Outlet />;
}

export function V1IsLogin() {
  const { me } = useV1Me();
  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      navigate("/v1-mongodb");
    }
  }, [me, navigate]);

  return <Outlet />;
}
