/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductAdd
// ====================================================

export interface ProductAdd_productAdd_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface ProductAdd_productAdd_category {
  __typename: "Category";
  id: string;
  name: string;
  subcategories: ProductAdd_productAdd_category_subcategories[];
}

export interface ProductAdd_productAdd_subcategory {
  __typename: "Subcategory";
  id: string;
  name: string;
}

export interface ProductAdd_productAdd {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductAdd_productAdd_category;
  subcategory: ProductAdd_productAdd_subcategory;
}

export interface ProductAdd {
  productAdd: ProductAdd_productAdd;
}

export interface ProductAddVariables {
  product: ProductInput;
}
