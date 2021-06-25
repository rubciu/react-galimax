import { gql } from '@apollo/client';

export const PRODUCT_REVIEW_TITLE_DATA = gql`
  fragment ProductReviewTile on ProductReview {
    product {
      id
      name
      description
    }
    title
    review
    score
    user
    date
  }
`;

export const GET_PRODUCT_REVIEWS = gql`
  query GetProductReviews($productId: ID!) {
    productReviews(productId: $productId) {
      ...ProductReviewTile
    }
  }
  ${PRODUCT_REVIEW_TITLE_DATA}
`;

export const PRODUCT_REVIEW_ADD = gql`
  mutation ProductReviewAdd($productReview: ProductReviewInput!) {
    productReviewAdd(productReview: $productReview) {
      ...ProductReviewTile
    }
  }
  ${PRODUCT_REVIEW_TITLE_DATA}
`;