import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useV1, V1Tags } from "@/hooks/useV1";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

export function QueryReset() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = () => {
    setSearchParams({});
    window.location.reload();
  };

  if (searchParams.size > 0)
    return (
      <Button onClick={onClick} size={"sm"} variant={"outline"}>
        Reset All
      </Button>
    );
  return null;
}

export function QuerySearch({ className }: { className?: string }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChange = useDebouncedCallback((e: string) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      params.set("q", e);
    } else params.delete("q");
    navigate(`?${params.toString()}`);
  }, 300);

  return (
    <Input
      className={`${className}`}
      defaultValue={searchParams.get("q")?.toString()}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search name.."
    />
  );
}

export function QueryFilterCat({ className }: { className?: string }) {
  const { getCat, cat } = useV1();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onChange = (e: string) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      if (e === "none") {
        params.delete("category");
      } else params.set("category", e);
    } else params.delete("category");

    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    getCat();
  }, [getCat]);

  return (
    <Select value={searchParams.get("category")?.toString()} onValueChange={onChange}>
      <SelectTrigger className={`${className} w-full`}>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"none"}>No Category</SelectItem>
        {cat.map((item) => (
          <SelectItem key={item._id} value={item._id}>
            {item?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function QuerySort() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("-createdAt");

  const onClick = (e: string) => {
    const params = new URLSearchParams(searchParams);
    setSort(e);
    if (e) {
      params.set("sort", e);
    } else params.delete("sort");

    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const sortParam = searchParams.get("sort")?.toString();
    if (sortParam) {
      setSort(sortParam);
    }
  }, [searchParams]);

  return (
    <>
      <Button onClick={() => onClick("-createdAt")} variant={sort === "-createdAt" ? "default" : "outline"}>
        Latest
      </Button>
      <Button onClick={() => onClick("createdAt")} variant={sort === "createdAt" ? "default" : "outline"}>
        Oldest
      </Button>
      <Button onClick={() => onClick("name")} variant={sort === "name" ? "default" : "outline"}>
        A-Z
      </Button>
      <Button onClick={() => onClick("-name")} variant={sort === "-name" ? "default" : "outline"}>
        Z-A
      </Button>
    </>
  );
}

export function QueryTag() {
  const { tag, getTag } = useV1();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tagQuery, setTagQuery] = useState<string[]>([]);

  const onClick = (e: string) => {
    setTagQuery((prev) => {
      if (prev.find((p) => p === e)) {
        return prev.filter((p) => p !== e);
      } else {
        return [...prev, e];
      }
    });
  };

  useEffect(() => {
    getTag();
  }, [getTag]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (tagQuery.length > 0) {
      tagQuery.map((item) => params.set("tag", item));
    } else {
      params.delete("tag");
    }

    navigate(`?${params.toString()}`);
  }, [navigate, searchParams, tagQuery]);

  return (
    <>
      {tag.map((item: V1Tags) => (
        <Badge
          variant={tagQuery.includes(item._id as string) ? "outline" : "default"}
          onClick={() => onClick(item._id)}
          key={item?._id}
          className={`cursor-pointer`}
        >
          {item?.name}
        </Badge>
      ))}
    </>
  );
}
