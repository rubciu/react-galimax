import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductReviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  title: String,
  review: String,
  score: Number,
  user: String, // TODO: use User model
  date: String,
});

export const ProductReview = mongoose.model(
  "ProductReview",
  ProductReviewSchema
);