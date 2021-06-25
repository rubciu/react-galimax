import {
  CategoryDetails,
  CategoryDetailsVariables,
} from "../queries/category/__generated__/CategoryDetails";

import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useQuery } from "@apollo/client";

import { GET_CATEGORY_DETAILS } from "../queries/category";

import CategoryForm from "../components/category-form/category-form";

interface CategoryProps extends RouteComponentProps {
  categoryId?: any; // TODO: don't use any
}

const Category: React.FC<CategoryProps> = ({ categoryId }) => {
  const category = useQuery<CategoryDetails, CategoryDetailsVariables>(
    GET_CATEGORY_DETAILS,
    { variables: { categoryId } }
  );

  if (category.loading) return <p>Cargando...</p>;
  if (category.error) return <p>ERROR: {category.error.message}</p>;
  if (!category.data) return <p>No hay datos que mostrar</p>;

  const categoryDetails = category.data.category
    ? category.data.category
    : undefined;

  return (
    <div>
      <h1>{categoryDetails?.name}</h1>
      <CategoryForm category={categoryDetails} />
    </div>
  );
};

export default Category;
