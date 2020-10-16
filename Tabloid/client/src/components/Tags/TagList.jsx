import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";
//import { Button } from 'react-bootstrap';
import TagForm from "./TagForm";
import {
    Button,
  } from "reactstrap";





export default function TagList() {
    const { tags, getAllTags} = useContext(TagContext);


    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <>
            <section className="tagz">
                <div className="tagzHeader">
                    <h2>Tagz</h2>
                    <div>
                        <Link to={`/tags/add`}>
                            <Button color="primary">Add New Tag</Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="tagsListContainer">
                <div className="tagsList">
                    {tags.map(t =>
                        <Tag key={t.id} tag={t} />
                    )}
                </div>
            </section>
        </>
    );
}