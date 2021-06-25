import * as ProductAddTypes from "../../queries/product/__generated__/ProductAdd";
import * as ProductDetailsTypes from "../../queries/product/__generated__/ProductDetails";
import * as ProductUpdateTypes from "../../queries/product/__generated__/ProductUpdate";
import * as GetCategoriesTypes from "../../queries/category/__generated__/GetCategories";

import React, { useState, useEffect, ChangeEvent } from "react";
import { getCachedCategoryById } from "../../queries/category/index";

import FormInput from "../form-input/form-input";
import styles from "./product-form.module.scss";

interface ProductFormProps {
  product?: ProductDetailsTypes.ProductDetails_product;
  productAdd?: (a: { variables: ProductAddTypes.ProductAddVariables }) => void;
  productUpdate?: (a: {
    variables: ProductUpdateTypes.ProductUpdateVariables;
  }) => void;
  categories?: GetCategoriesTypes.GetCategories;
  apolloClient?: any; // TODO: change any
}

interface ProductFormState {
  productInput: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    subcategory: string;
  };
  subcategories: ProductDetailsTypes.ProductDetails_product_subcategory[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  productAdd,
  productUpdate,
  categories,
  apolloClient,
}) => {
  const [formState, setFormState] = useState<ProductFormState>({
    productInput: {
      id: "",
      name: "",
      description: "",
      price: 0,
      images: [],
      category: "",
      subcategory: "",
    },
    subcategories: [],
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (productAdd) {
      productAdd({
        variables: {
          product: formState.productInput,
        },
      });

      // TODO: Refetch queries
    }

    if (productUpdate) {
      productUpdate({
        variables: {
          product: formState.productInput,
        },
      });

      // TODO: Refetch queries
    }
  };

  const getImageUrl = async (image: File) => {
    const data = new FormData();

    data.append("upload_preset", "galimax");
    data.append("file", image);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/galimax/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const result = await res.json();
    return result.secure_url;
  };

  const uploadImages = async (images: FileList) => {
    if (!images) return;

    const arrUploadPromises: Promise<string>[] = [];

    Array.from(images).forEach((image) => {
      arrUploadPromises.push(getImageUrl(image));
    });

    const arrImageUrls = await Promise.all(arrUploadPromises);

    setFormState({
      ...formState,
      productInput: {
        ...formState.productInput,
        images: [...formState.productInput.images, ...arrImageUrls],
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    const formatValue = (field: string, val: any) => {
      switch (field) {
        case "price":
          return +val;
        default:
          return val;
      }
    };

    setFormState({
      ...formState,
      productInput: {
        ...formState.productInput,
        [name]: formatValue(name, value),
      },
    });
  };
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId: string = event.target.value;

    getCachedCategoryById(apolloClient.client, categoryId)
      .then((category: ProductDetailsTypes.ProductDetails_product_category) => {
        setFormState({
          productInput: {
            ...formState.productInput,
            category: category.id,
            subcategory: "none",
          },
          subcategories: category.subcategories,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (images: FileList | null) => {
    if (images && images.length > 0) {
      uploadImages(images);
    }
  };
  useEffect(() => {
    if (product) {
      setFormState({
        productInput: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          category: product.category.id,
          subcategory: product.subcategory.id,
        },
        subcategories: product.category.subcategories,
      });
    }
  }, [product]);

  return (
    <div className={styles.productForm}>
      <form onSubmit={handleSubmit}>
        <FormInput
          field="name"
          label="Nombre"
          defaultValue={formState.productInput.name}
          handleChange={handleChange}
        />
        <FormInput
          field="description"
          label="Descripción"
          defaultValue={formState.productInput.description}
          handleChange={handleChange}
        />
        <FormInput
          field="price"
          label="Precio"
          defaultValue={formState.productInput.price}
          handleChange={handleChange}
        />

        <div>
          Categoria
          <p>
            <select
              id="category"
              name="category"
              value={formState.productInput.category}
              onChange={handleCategoryChange}
            >
              <option value="none">Selecciona una categoria</option>
              {categories?.categories.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </p>
        </div>

        <div>
          Subcategorias
          <p key="index">
            <select
              id="subcategory"
              name="subcategory"
              value={formState.productInput.subcategory}
              onChange={handleChange}
            >
              <option value="none">Selecciona una subcategoria</option>
              {formState.subcategories?.map((subcategory) => (
                <option key={subcategory?.id} value={subcategory?.id}>
                  {subcategory?.name}
                </option>
              ))}
            </select>
          </p>
        </div>

        <div>
          Imagenes
          <p>
            {formState.productInput.images.map(
              (imageURL: string, index: number) => (
                <img key={index} src={imageURL} width="100" alt="Thumbnail" />
              )
            )}
          </p>
          <p>
            <input
              type="file"
              multiple
              name="imageURL"
              placeholder="Selecciona una imagen"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(e.target.files)
              }
            />
          </p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
