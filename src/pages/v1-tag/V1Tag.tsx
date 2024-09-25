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
          <div className="flex flex-col gap-1">
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
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Tag List</h2>
        <Button size={"sm"} asChild>
          <Link to="/tag-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
