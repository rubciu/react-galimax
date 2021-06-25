import { gql } from "apollo-server";

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    images: [String!]!
    category: Category!
    subcategory: Subcategory!
  }

  type ProductReview {
    product: Product!
    title: String!
    review: String!
    score: Float!
    user: String!
    date: String!
  }

  input ProductInput {
    id: String!
    name: String!
    description: String!
    price: Float!
    images: [String!]!
    category: String!
    subcategory: String!
  }

  input ProductReviewInput {
    product: String!
    title: String!
    review: String!
    score: Float!
    user: String!
    date: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String!
    subcategories: [Subcategory!]!
  }

  input CategoryInput {
    name: String!
    description: String!
    subcategories: [String!]!
  }

  type Subcategory {
    id: ID!
    name: String!
    description: String!
  }

  input SubcategoryInput {
    name: String!
    description: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    products: [Product]!
    product(id: ID!): Product
    categories: [Category]!
    category(id: ID!): Category
    subcategories: [Subcategory]!
    productReviews(productId: ID!): [ProductReview]!
  }

  type Mutation {
    productAdd(product: ProductInput!): Product!
    productUpdate(product: ProductInput!): Product!
    productReviewAdd(productReview: ProductReviewInput!): ProductReview!
    categoryAdd(category: CategoryInput!): Category!
    subcategoryAdd(subcategories: [SubcategoryInput!]!): [Subcategory!]
  }
`;
