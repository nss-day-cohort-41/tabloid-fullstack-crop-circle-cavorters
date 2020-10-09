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

            <section>
                <div>
                    <Link to={`/tags/add`}><Button color="primary">Add New Tag</Button></Link>
                </div>
                {tags.map(t =>
                    <Tag key={t.id} tag={t} />
                )}
            </section>

        </>
    );
}