import * as ProductListTypes from "../queries/product/__generated__/GetProducts";
import { GetCategories_categories } from "../queries/category/__generated__/GetCategories";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";

import { GET_PRODUCTS } from "../queries/product";
import Product from "../components/product/product";

import styles from "./pages.module.scss";
import { getCachedCategories } from "../queries/category";
import ProductFilters from "../components/filters/filters";

interface ProductsProps extends RouteComponentProps {
  // apolloClient: ApolloClient<NormalizedCacheObject>
  apolloClient: any;
}

const Products: React.FC<ProductsProps> = ({ apolloClient }) => {
  const { data, loading, error } = useQuery<ProductListTypes.GetProducts>(
    GET_PRODUCTS
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <div className={styles.products}>
      {data.products ? (
        <div>
          <ProductFilters apolloClient={apolloClient} />
          {data.products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Products;
