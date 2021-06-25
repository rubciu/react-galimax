/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_category_subcategories {
  __typename: "Subcategory";
  id: string;
  name: string;
  description: string;
}

export interface ProductDetails_product_category {
  __typename: "Category";
  id: string;
  name: string;
  subcategories: ProductDetails_product_category_subcategories[];
}

export interface ProductDetails_product_subcategory {
  __typename: "Subcategory";
  id: string;
  name: string;
}

export interface ProductDetails_product {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductDetails_product_category;
  subcategory: ProductDetails_product_subcategory;
}

export interface ProductDetails {
  product: ProductDetails_product | null;
}

export interface ProductDetailsVariables {
  productId: string;
}
