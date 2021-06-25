import {
  ProductDetails,
  ProductDetailsVariables,
} from "../queries/product/__generated__/ProductDetails";
import * as ProductUpdateTypes from "../queries/product/__generated__/ProductUpdate";
import * as GetCategoriesTypes from "../queries/category/__generated__/GetCategories";

import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useQuery, useMutation } from "@apollo/client";

import { useToasts } from "../shared/toast/toast-provider";

import { GET_PRODUCT_DETAILS, PRODUCT_UPDATE } from "../queries/product";
import { GET_CATEGORIES } from "../queries/category";
import ProductForm from "../components/product-form/product-form";

interface ProductProps extends RouteComponentProps {
  productId?: any; // TODO: give type
  apolloClient: any; // TODO: give type
}

const Product: React.FC<ProductProps> = ({ productId, apolloClient }) => {
  const { addToast } = useToasts();

  const categories = useQuery<GetCategoriesTypes.GetCategories>(GET_CATEGORIES);
  const product = useQuery<ProductDetails, ProductDetailsVariables>(
    GET_PRODUCT_DETAILS,
    { variables: { productId } }
  );

  const [productUpdate] = useMutation<
    ProductUpdateTypes.ProductUpdate,
    ProductUpdateTypes.ProductUpdateVariables
  >(PRODUCT_UPDATE, {
    onCompleted({ productUpdate }) {
      console.log(":::: PRODUCT UPDATED :::: ", productUpdate);

      addToast(`PRODUCT UPDATED: ${productUpdate?.name}`);
    },
  });

  if (product.loading) return <p>Cargando...</p>;
  if (product.error) return <p>ERROR: {product.error.message}</p>;
  if (!product.data) return <p>No hay datos que mostrar</p>;

  const productDetails = product.data.product
    ? product.data.product
    : undefined;

  return (
    <div>
      <h1>{productDetails?.name}</h1>
      <ProductForm
        product={productDetails}
        productUpdate={productUpdate}
        categories={categories.data}
        apolloClient={apolloClient}
      />
    </div>
  );
};

export default Product;
