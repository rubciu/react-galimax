/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductTile
// ====================================================

export interface ProductTile_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface ProductTile_category {
  __typename: "Category";
  id: string;
  name: string;
  subcategories: ProductTile_category_subcategories[];
}

export interface ProductTile_subcategory {
  __typename: "Subcategory";
  id: string;
  name: string;
}

export interface ProductTile {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductTile_category;
  subcategory: ProductTile_subcategory;
}
