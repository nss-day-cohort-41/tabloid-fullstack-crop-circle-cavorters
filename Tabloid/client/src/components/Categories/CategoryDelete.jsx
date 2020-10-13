import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const DeleteCategoryAlert = () => {
    const [category, setCategory] = useState();
    const { deleteCategory, getCategoryById } = useContext(CategoryContext);
    const { id } = useParams();
    const history = useHistory();

    const deleteIndividualCategory = (e) => {
        e.preventDefault();
        deleteCategory(category.id)
            .then(() => history.push("/categories"));
    }

    useEffect(() => {
        getCategoryById(id)
            .then((category) => {
                setCategory(category)
            })
    }, []);

    if (!category) {
        return null;
    }

    return (
        <>
            <main className="users-container">
                <section className="users-table">
                    <h4>Do you wish to delete Category: "{category.name}"?</h4>
                    <hr />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="submit" onClick={deleteIndividualCategory} value="Confirm" className="btn btn-primary" />&nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/categories">
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

export default DeleteCategoryAlert;