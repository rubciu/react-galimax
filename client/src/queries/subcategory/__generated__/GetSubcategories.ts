/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSubcategories
// ====================================================

export interface GetSubcategories_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface GetSubcategories {
  subcategories: (GetSubcategories_subcategories | null)[];
}
