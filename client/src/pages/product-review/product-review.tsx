import {
  ProductDetails,
  ProductDetailsVariables,
} from "../../queries/product/__generated__/ProductDetails";
import {
  ProductReviewAdd,
  ProductReviewAddVariables,
} from "../../queries/product-review/__generated__/ProductReviewAdd";

import React, { useState } from "react";

import styles from "./product-review.module.scss";
import { RouteComponentProps } from "@reach/router";
import { useQuery, useMutation } from "@apollo/client";

import { useToasts } from "../../shared/toast/toast-provider";

import { GET_PRODUCT_DETAILS } from "../../queries/product";
import Rating from "../../components/rating/rating";
import FormInput from "../../components/form-input/form-input";
import { PRODUCT_REVIEW_ADD } from "../../queries/product-review";

interface ProductReviewProps extends RouteComponentProps {
  productId?: any; // TODO: give type
}

interface ProductReviewState {
  reviewInput: {
    product: string;
    title: string;
    review: string;
    score: number;
    user: string;
    date: string;
  };
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const { addToast } = useToasts();
  const [productReviewState, setProductReviewState] = useState<
    ProductReviewState
  >({
    reviewInput: {
      product: productId,
      title: "",
      review: "",
      score: 0,
      user: "123456", // TODO: set user
      date: "19-11-2020", // TODO: set date
    },
  });
  const [productReviewAdd] = useMutation<
    ProductReviewAdd,
    ProductReviewAddVariables
  >(PRODUCT_REVIEW_ADD, {
    onCompleted({ productReviewAdd }) {
      addToast(`PRODUCT REVIEW ADDED: ${productReviewAdd.title}`);
    },
  });

  const product = useQuery<ProductDetails, ProductDetailsVariables>(
    GET_PRODUCT_DETAILS,
    { variables: { productId } }
  );

  if (product.loading) return <p>Cargando...</p>;
  if (product.error) return <p>ERROR: {product.error.message}</p>;
  if (!product.data) return <p>No hay datos que mostrar</p>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    productReviewAdd({
      variables: {
        productReview: productReviewState.reviewInput,
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setProductReviewState({
      ...productReviewState,
      reviewInput: {
        ...productReviewState.reviewInput,
        [name]: value,
      },
    });
  };

  const setScore = (index: number) => {
    setProductReviewState({
      ...productReviewState,
      reviewInput: {
        ...productReviewState.reviewInput,
        score: index,
      },
    });
  };

  const productDetails = product.data.product
    ? product.data.product
    : undefined;

  return (
    <div className={styles.productReview}>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Escribe una reseña</h1>
          <img src={productDetails?.images[0]} width="100px" />
          <h3>{productDetails?.name}</h3>
          <small>{productDetails?.name}</small>
        </div>
        <div>
          <h2>Valoración</h2>
          <Rating active={true} handleClick={setScore} />
        </div>
        <div>
          <h2>Titulo</h2>
          <FormInput
            field="title"
            label="Titulo de la reseña"
            defaultValue={productReviewState.reviewInput.title}
            handleChange={handleChange}
          />
        </div>
        <div>
          <h2>Reseña</h2>
          <FormInput
            field="review"
            label="Reseña"
            defaultValue={productReviewState.reviewInput.review}
            handleChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductReview;
