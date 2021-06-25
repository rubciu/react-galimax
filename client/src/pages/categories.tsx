import * as GetCategoriesTypes from "../queries/category/__generated__/GetCategories";

import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { useQuery } from "@apollo/client";

import { GET_CATEGORIES } from "../queries/category";

import CategoryForm from "../components/category-form/category-form";

interface CategoriesProps extends RouteComponentProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const { data } = useQuery<GetCategoriesTypes.GetCategories>(GET_CATEGORIES);

  return (
    <div>
      <h1>Categorias</h1>
      <ul>
        {data?.categories.map((category) => (
          <li key={category?.id}>
            <Link to={`/categorias/${category?.id}`}>{category?.name}</Link>
          </li>
        ))}
      </ul>
      <CategoryForm />
    </div>
  );
};

export default Categories;
