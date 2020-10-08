import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";




export default function TagList() {
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <section>
      {tags.map(t =>
        <Tag key={t.id} tag={t}/>
      )}
    </section>
  );
}