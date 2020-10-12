import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button } from "reactstrap";


export default function CategoryList() {
    const { categories, GetAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        GetAllCategories();
    }, []);
    // console.log(categories);
    return (
        <section>
            <Link to={`/categories/add`}><Button>Add A New Category</Button></Link>
            {categories.map(c =>
                <Category key={c.id} category={c} />
            )}
        </section>
    );
}