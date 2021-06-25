import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  name: String,
  description: String,
});

export const Subcategory = mongoose.model('Subcategory', SubcategorySchema);