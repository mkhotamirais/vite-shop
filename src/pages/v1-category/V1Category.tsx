import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect } from "react";
import V1CategoryList from "./V1CategoryList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV1 } from "@/hooks/useV1";

export default function V1Category() {
  const { cat, getCat, loadCat, errCat } = useV1();

  useEffect(() => {
    getCat();
  }, [getCat]);

  let content;
  if (loadCat) {
    content = <LoaderBounce />;
  } else if (errCat) {
    content = <Err>{errCat}</Err>;
  } else {
    content = (
      <>
        {cat.length > 0 ? (
          <div className="flex flex-col gap-1">
            {cat?.map((item) => (
              <V1CategoryList key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center italic">Data empty</div>
        )}
      </>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Category List</h2>
        <Button size={"sm"} asChild>
          <Link to="/category-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
