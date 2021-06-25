/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCachedCategories
// ====================================================

export interface GetCachedCategories_categories_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface GetCachedCategories_categories {
  __typename: "Category";
  id: string;
  name: string;
  description: string;
  subcategories: GetCachedCategories_categories_subcategories[];
}

export interface GetCachedCategories {
  categories: (GetCachedCategories_categories | null)[];
}
