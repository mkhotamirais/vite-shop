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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {users
          .filter((item) => item.email !== "ahmad@gmail.com")
          .map((item) => (
            <V1UserList key={item._id} item={item} />
          ))}
      </div>
    );
  }

  return (
    <section className="py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-3 text-primary">User List</h2>
      </div>

      {content}
    </section>
  );
}
