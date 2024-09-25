import { Err, LoaderBounce } from "@/components/Wrapper";
import { useV1 } from "@/hooks/useV1";
import { useEffect } from "react";
import V1UserList from "./V1UserList";

export default function V1User() {
  const { users, getUsers, loadUsers, errUsers } = useV1();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  let content;
  if (loadUsers) {
    content = <LoaderBounce />;
  } else if (errUsers) {
    content = <Err>{errUsers}</Err>;
  } else {
    content = (
      <div className="flex flex-col gap-1">
        {users
          .filter((item) => item.email !== "ahmad@gmail.com")
          .map((item) => (
            <V1UserList key={item._id} item={item} />
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">User List</h2>
      </div>

      {content}
    </div>
  );
}
