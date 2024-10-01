import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect } from "react";
import V1TagList from "./V1TagList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV1 } from "@/hooks/useV1";

export default function V1Tag() {
  const { tag, getTag, loadTag, errTag } = useV1();

  useEffect(() => {
    getTag();
  }, [getTag]);

  let content;
  if (loadTag) {
    content = <LoaderBounce />;
  } else if (errTag) {
    content = <Err>{errTag}</Err>;
  } else {
    content = (
      <>
        {tag.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {tag?.map((item) => (
              <V1TagList key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center italic">Data empty</div>
        )}
      </>
    );
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3 text-primary">Tag List</h2>
        <Button asChild>
          <Link to="/tag-create">Add New</Link>
        </Button>
      </div>
      {content}
    </div>
  );
}
