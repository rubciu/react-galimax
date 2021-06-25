/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductReviews
// ====================================================

export interface GetProductReviews_productReviews_product {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
}

export interface GetProductReviews_productReviews {
  __typename: "ProductReview";
  product: GetProductReviews_productReviews_product;
  title: string;
  review: string;
  score: number;
  user: string;
  date: string;
}

export interface GetProductReviews {
  productReviews: (GetProductReviews_productReviews | null)[];
}

export interface GetProductReviewsVariables {
  productId: string;
}
