import { gql } from "@apollo/client";

export const PRODUCT_TILE_DATA = gql`
  fragment ProductTile on Product {
    id
    name
    description
    price
    images
    category {
      id
      name
      subcategories {
        id
        name
        description
      }
    }
    subcategory {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export const PRODUCT_ADD = gql`
  mutation ProductAdd($product: ProductInput!) {
    productAdd(product: $product) {
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export const GET_PRODUCT_DETAILS = gql`
  query ProductDetails($productId: ID!) {
    product(id: $productId) {
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export const PRODUCT_UPDATE = gql`
  mutation ProductUpdate($product: ProductInput!) {
    productUpdate(product: $product) {
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;
