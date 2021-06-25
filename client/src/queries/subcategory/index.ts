import { gql } from "@apollo/client";

export const SUBCATEGORY_TILE_DATA = gql`
  fragment SubcategoryTile on Subcategory {
    id
    name
    description
  }
`;

export const GET_SUBCATEGORIES = gql`
  query GetSubcategories {
    subcategories {
      ...SubcategoryTile
    }
  }
  ${SUBCATEGORY_TILE_DATA}
`;

export const SUBCATEGORY_ADD = gql`
  mutation SubcategoryAdd($subcategories: [SubcategoryInput!]!) {
    subcategoryAdd(subcategories: $subcategories) {
      ...SubcategoryTile
    }

  }
  ${SUBCATEGORY_TILE_DATA}
`;

