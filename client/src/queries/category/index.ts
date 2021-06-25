import gql from "graphql-tag";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const CATEGORY_TILE_DATA = gql`
  fragment CategoryTile on Category {
    id
    name
    description
    subcategories {
      id
      name
      description
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      ...CategoryTile
    }
  }
  ${CATEGORY_TILE_DATA}
`;

export const CATEGORY_ADD = gql`
  mutation CategoryAdd($category: CategoryInput!) {
    categoryAdd(category: $category) {
      ...CategoryTile
    }
  }
  ${CATEGORY_TILE_DATA}
`;

export const GET_CATEGORY_DETAILS = gql`
  query CategoryDetails($categoryId: ID!) {
    category(id: $categoryId) {
      ...CategoryTile
    }
  }
  ${CATEGORY_TILE_DATA}
`;

export const getCachedCategories = async (
  client: ApolloClient<any> // TODO: change any?
) => {
  const result = await client.readQuery({
    query: gql`
      query GetCachedCategories {
        categories {
          id
          name
          description
          subcategories {
            id
            name
            description
          }
        }
      }
    `,
  });

  return result;
};

export const getCachedCategoryById = async (
  client: ApolloClient<any>, // TODO: change any?
  id: string
) => {
  const result = await client.readQuery({
    query: gql`
      query GetCategory($id: ID!) {
        category(id: $id) {
          id
          name
          description
          subcategories {
            id
            name
            description
          }
        }
      }
    `,
    variables: {
      id,
    },
  });

  return result.category;
};
