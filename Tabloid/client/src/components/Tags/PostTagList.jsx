import React, { useContext, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import PostTag from "./PostTag";
//import { TagContext } from "../../providers/TagProvider";
import {PostTagContext} from "../../providers/PostTagProvider";
import {PostContext} from "../../providers/PostProvider";
import {TagContext} from "../../providers/TagProvider";
//import { Button } from 'react-bootstrap';
//import TagForm from "./TagForm";
import {
    Button,
  } from "reactstrap";
import { useState } from "react";





export default function PostTagList() {
    //const { tags, getAllTags} = useContext(TagContext);
    const { postTags, getAllTagsForAPost } = useContext(PostTagContext);
    const { post, getById } = useContext(PostContext);
    const { tag, getTagById } = useContext(TagContext);
    //const {postTag} = useState("");
    const { id } = useParams();
    //const {postTag, setPostTag}
   const parsedId= parseInt(id)
    
    useEffect(() => {      
        getById(id)
    }, []);
    
    useEffect(() => {
      getAllTagsForAPost(id);   
    }, []);

//     console.log("postTagcaptureobject1.5", tag) 
//    console.log("postTagcaptureobject2", postTags) 
//    console.log("postTagcaptureobject3", post)  
   
   if(!postTags) {
   return null;
   }


    return (
        <>
            <section className="tagz">
                <div className="tagzHeader">
                    <h2>Tagz On :<h5>{post.title}</h5></h2>
                    
                        
                    <div>
                        
                        <Link to={`/tags/add`}>
                            <Button color="primary">Add New Tag</Button>
                        </Link>
                        
                        
                    </div>
                </div>
            </section>
            <section className="tagsListContainer">
                <div className="tagsList">
                
                {postTags.map(pt =>
          <PostTag key={pt.id} PostTag={pt}/>
      )}
                </div>
            </section>
        </>
    );
}