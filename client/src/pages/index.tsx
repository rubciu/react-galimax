import * as GetCategoriesTypes from "../queries/category/__generated__/GetCategories";

import React, { Fragment } from "react";
import { Router } from "@reach/router";
import { useQuery } from "@apollo/client";
import { withApollo } from "@apollo/react-hoc";

import { ToastProvider } from "../shared/toast/toast-provider";

import { GET_CATEGORIES } from "../queries/category";

import Products from "./products";
import ProductAdd from "./product-add";
import ProductEdit from "./product-edit";
import ProductDetails from "./product-details/product-details";
import Categories from "./categories";
import CategoryDetails from "./category-details";
import Menu from "../components/menu/menu";
import ProductReview from "./product-review/product-review";

function Pages(client: any) {
  // TODO: change any
  const categories = useQuery<GetCategoriesTypes.GetCategories>(GET_CATEGORIES);

  return (
    <div>
      <Menu categories={categories.data} />
      <ToastProvider>
        <Router primary={false} component={Fragment}>
          <Products apolloClient={client} path="/" />
          <ProductAdd path="/productos/anadir" apolloClient={client} />
          <ProductEdit apolloClient={client} path="/productos/editar/:productId" />
          <ProductEdit
            path="/productos/editar/:categoryId/:subcategoryId/:productId"
            apolloClient={client}
          />
          <ProductDetails apolloClient={client} path="/productos/:productId" />
          <ProductReview path="/productos/crear-resena/:productId" />
          <Categories path="/categorias" />
          <CategoryDetails path="/categorias/:categoryId" />
        </Router>
      </ToastProvider>
    </div>
  );
}

export default withApollo(Pages);
