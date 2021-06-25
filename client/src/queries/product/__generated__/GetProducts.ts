/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface GetProducts_products_category {
  __typename: "Category";
  id: string;
  name: string;
  subcategories: GetProducts_products_category_subcategories[];
}

export interface GetProducts_products_subcategory {
  __typename: "Subcategory";
  id: string;
  name: string;
}

export interface GetProducts_products {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: GetProducts_products_category;
  subcategory: GetProducts_products_subcategory;
}

export interface GetProducts {
  products: (GetProducts_products | null)[];
}
