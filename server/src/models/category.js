import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: String,
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: 'Subcategory'
  }]
});

export const Category = mongoose.model('Category', CategorySchema);