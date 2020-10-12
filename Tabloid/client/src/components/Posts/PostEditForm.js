import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function EditPost() {

    const { getById, updatePost } = useContext(PostContext);
    const [editedPost, setEditedPost] = useState("");
    const [post, setPost] = useState("");
    //UseParams pulls in the id information from applications view 
    const { id } = useParams();

    const history = useHistory();
}