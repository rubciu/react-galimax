import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory"
  }
});

export const Product = mongoose.model("Product", ProductSchema);
