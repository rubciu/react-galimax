/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryDetails
// ====================================================

export interface CategoryDetails_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface CategoryDetails_category {
  __typename: "Category";
  id: string;
  name: string;
  description: string;
  subcategories: CategoryDetails_category_subcategories[];
}

export interface CategoryDetails {
  category: CategoryDetails_category | null;
}

export interface CategoryDetailsVariables {
  categoryId: string;
}
