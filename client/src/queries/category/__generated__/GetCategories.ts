/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_categories_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface GetCategories_categories {
  __typename: "Category";
  id: string;
  name: string;
  description: string;
  subcategories: GetCategories_categories_subcategories[];
}

export interface GetCategories {
  categories: (GetCategories_categories | null)[];
}
