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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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
    <section className="py-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold my-3 text-primary">Category List</h2>
        <Button asChild>
          <Link to="/category-create">Add New</Link>
        </Button>
      </div>
      {content}
    </section>
  );
}
