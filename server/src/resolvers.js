import { Product } from "./models/product";
import { Category } from "./models/category";
import { Subcategory } from "./models/subcategory";
import { ProductReview } from "./models/product-review";

const product = (productId) =>
  Product.findById(productId)
    .then((product) => product)
    .catch((err) => {
      throw err;
    });

const category = (categoryId) =>
  Category.findById(categoryId)
    .populate("subcategories")
    .then((category) => category)
    .catch((err) => {
      throw err;
    });

const subcategory = (subcategoryId) =>
  Subcategory.findById(subcategoryId)
    .then((subcategory) => subcategory)
    .catch((err) => {
      throw err;
    });

export const resolvers = {
  Query: {
    // Product

    products: () =>
      Product.find()
        .populate({
          path: "category",
          populate: {
            path: "subcategories",
            model: "Subcategory",
          },
        })
        .populate("subcategory"),

    product: (_, { id }) =>
      Product.findById(id)
        .populate({
          path: "category",
          populate: {
            path: "subcategories",
            model: "Subcategory",
          },
        })
        .populate("subcategory"),

    productReviews: (_, { productId }) =>
      ProductReview.find({ product: productId }).populate("product"),

    // Categories / Subcategories

    categories: () => Category.find().populate("subcategories"),
    category: (_, { id }) => Category.findById(id).populate("subcategories"),
    subcategories: () => Subcategory.find(),
  },
  Mutation: {
    productAdd: (_, { product }) =>
      new Product(product).save().then((product) => {
        return {
          ...product,
          id: product._id,
          category: category.bind(this, product.category),
          subcategory: subcategory.bind(this, product.subcategory),
        };
      }),

    productUpdate: (_, { product }) => {
      return Product.findOneAndUpdate({ _id: product.id }, product, {
        new: true,
      })
        .lean()
        .then((product) => {
          return {
            ...product,
            id: product._id,
            category: category.bind(this, product.category),
            subcategory: subcategory.bind(this, product.subcategory),
          };
        })
        .catch((err) => {
          throw err;
        });
    },

    productReviewAdd: (_, { productReview }) =>
      new ProductReview(productReview)
        .save()
        .then((doc) => doc.populate("product").execPopulate()),

    categoryAdd: (_, { category }) => new Category(category).save(),

    subcategoryAdd: (_, { subcategories }) =>
      Subcategory.insertMany(subcategories)
        .then((docs) => {
          return docs.map((subcategory) => {
            return {
              id: subcategory.id,
              name: subcategory.name,
              description: subcategory.description,
            };
          });
        })
        .catch((err) => err),
  },
};
