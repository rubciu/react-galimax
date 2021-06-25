/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryAdd
// ====================================================

export interface CategoryAdd_categoryAdd_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface CategoryAdd_categoryAdd {
  __typename: "Category";
  id: string;
  name: string;
  description: string;
  subcategories: CategoryAdd_categoryAdd_subcategories[];
}

export interface CategoryAdd {
  categoryAdd: CategoryAdd_categoryAdd;
}

export interface CategoryAddVariables {
  category: CategoryInput;
}
