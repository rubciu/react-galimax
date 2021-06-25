/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductReviewInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductReviewAdd
// ====================================================

export interface ProductReviewAdd_productReviewAdd_product {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
}

export interface ProductReviewAdd_productReviewAdd {
  __typename: "ProductReview";
  product: ProductReviewAdd_productReviewAdd_product;
  title: string;
  review: string;
  score: number;
  user: string;
  date: string;
}

export interface ProductReviewAdd {
  productReviewAdd: ProductReviewAdd_productReviewAdd;
}

export interface ProductReviewAddVariables {
  productReview: ProductReviewInput;
}
