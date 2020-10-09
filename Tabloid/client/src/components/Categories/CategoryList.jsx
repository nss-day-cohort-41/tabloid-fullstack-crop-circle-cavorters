import React, { useContext, useEffect } from "react";
import Category from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryList() {
    const { categories, GetAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        GetAllCategories();
    }, []);

    return (
        <section>
            {categories.map(c =>
                <Category key={c.id} category={c} />
            )}
        </section>
    );
}