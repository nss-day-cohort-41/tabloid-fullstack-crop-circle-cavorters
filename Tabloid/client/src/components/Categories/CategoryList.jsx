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
    console.log(categories);
    return (
        <section>
            <Link to={`/categories/add`}><Button>Add New Category</Button></Link>
            {categories.map(category =>
                <Category key={category.id} category={category} />
            )}
        </section>
    );
}