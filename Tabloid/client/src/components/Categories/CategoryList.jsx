import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button } from "reactstrap";


export default function CategoryList() {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);
    // console.log(categories);
    return (
        <>
        <section className="tagz">
            <div className="tagzHeader">
                <h2>Categories</h2>
                <div>
                <Link to={`/categories/add`}>
                    <Button>Add A New Category</Button>
                </Link>
                </div>
            </div>
            </section>
            <section className="tagsListContainer">
            <div className="tagsList">
                {categories.map(c =>
                    <Category key={c.id} category={c} />
                )}
            </div>
        </section>
        </>
    );
}