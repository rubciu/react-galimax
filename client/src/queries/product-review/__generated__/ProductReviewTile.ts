/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductReviewTile
// ====================================================

export interface ProductReviewTile_product {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
}

export interface ProductReviewTile {
  __typename: "ProductReview";
  product: ProductReviewTile_product;
  title: string;
  review: string;
  score: number;
  user: string;
  date: string;
}
