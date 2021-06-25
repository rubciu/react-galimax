/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubcategoryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SubcategoryAdd
// ====================================================

export interface SubcategoryAdd_subcategoryAdd {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface SubcategoryAdd {
  subcategoryAdd: SubcategoryAdd_subcategoryAdd[] | null;
}

export interface SubcategoryAddVariables {
  subcategories: SubcategoryInput[];
}
