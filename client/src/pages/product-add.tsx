import * as ProductAddTypes from "../queries/product/__generated__/ProductAdd";
import * as GetCategoriesTypes from "../queries/category/__generated__/GetCategories";

import React from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { useQuery, useMutation } from "@apollo/client";

import { PRODUCT_ADD } from "../queries/product";
import { GET_CATEGORIES } from "../queries/category";

import ProductForm from "../components/product-form/product-form";
import { useToasts } from "../shared/toast/toast-provider";

interface ProductAddProps extends RouteComponentProps {
  apolloClient: any; // TODO: give type
}

const ProductAdd: React.FC<ProductAddProps> = ({ apolloClient }) => {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const { data } = useQuery<GetCategoriesTypes.GetCategories>(GET_CATEGORIES);

  const [productAdd] = useMutation<
    ProductAddTypes.ProductAdd,
    ProductAddTypes.ProductAddVariables
  >(PRODUCT_ADD, {
    onCompleted({ productAdd }) {
      console.log(":::: PRODUCT ADDED :::: ", productAdd);

      addToast(`PRODUCT ADDED: ${productAdd?.name}`);
      navigate(`/productos/${productAdd.id}`);
    },
  });

  return (
    <div>
      <h1>Añadir producto</h1>
      <ProductForm
        productAdd={productAdd}
        categories={data}
        apolloClient={apolloClient}
      />
    </div>
  );
};

export default ProductAdd;
