/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryTile
// ====================================================

export interface CategoryTile_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface CategoryTile {
  __typename: "Category";
  id: string;
  name: string;
  description: string;
  subcategories: CategoryTile_subcategories[];
}
