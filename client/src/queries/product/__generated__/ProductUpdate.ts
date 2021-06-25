/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductUpdate
// ====================================================

export interface ProductUpdate_productUpdate_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface ProductUpdate_productUpdate_category {
  __typename: "Category";
  id: string;
  name: string;
  subcategories: ProductUpdate_productUpdate_category_subcategories[];
}

export interface ProductUpdate_productUpdate_subcategory {
  __typename: "Subcategory";
  id: string;
  name: string;
}

export interface ProductUpdate_productUpdate {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductUpdate_productUpdate_category;
  subcategory: ProductUpdate_productUpdate_subcategory;
}

export interface ProductUpdate {
  productUpdate: ProductUpdate_productUpdate;
}

export interface ProductUpdateVariables {
  product: ProductInput;
}
