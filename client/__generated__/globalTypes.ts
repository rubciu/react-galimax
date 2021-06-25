/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CategoryInput {
  name: string;
  description: string;
  subcategories: string[];
}

export interface ProductInput {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
}

export interface ProductReviewInput {
  product: string;
  title: string;
  review: string;
  score: number;
  user: string;
  date: string;
}

export interface SubcategoryInput {
  name: string;
  description: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
