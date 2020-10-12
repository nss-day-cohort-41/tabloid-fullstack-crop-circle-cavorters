import React, { useState, useEffect, useContext } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const DeleteTagPrompt = () => {
  const [ tag, setTag] = useState();
  const { deleteTag, getTagById } = useContext(TagContext);
  const { id } = useParams();
  const history = useHistory();

  const deleteSpecificTag = (e) => {
    e.preventDefault();
    deleteTag(tag.id)
        .then(() => history.push("/tags"));
  }

  console.log(id)
  console.log(tag)
  

  useEffect(() => {
    getTagById(id)
    .then((tag) => {
        setTag(tag)
    })
  }, []);

  if (!tag) {
    return null;
  }  

  return (
    <>
        <main className="users-container">
            <section className="users-table">
                <h4>....So you wanna delete your tag : "{tag.name}"?</h4>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="submit" onClick={deleteSpecificTag} value="Confirm" className="btn btn-primary" />&nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/tags">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
      
    </>
  );
}

export default DeleteTagPrompt;