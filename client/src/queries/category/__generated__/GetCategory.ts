/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategory
// ====================================================

export interface GetCategory_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface GetCategory_category {
  __typename: "Category";
  id: string;
  name: string;
  description: string;
  subcategories: GetCategory_category_subcategories[];
}

export interface GetCategory {
  category: GetCategory_category | null;
}

export interface GetCategoryVariables {
  id: string;
}
