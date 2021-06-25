import React from "react";

import styles from "./product.module.scss";
import Rating from "../rating/rating";
import { Link } from "@reach/router";
import { useQuery } from "@apollo/client";
import {
  GetProductReviews,
  GetProductReviewsVariables,
} from "../../queries/product-review/__generated__/GetProductReviews";
import { GET_PRODUCT_REVIEWS } from "../../queries/product-review";

interface ProductProps {
  product: any; // TODO: give type
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const productReviews = useQuery<
    GetProductReviews,
    GetProductReviewsVariables
  >(GET_PRODUCT_REVIEWS, { variables: { productId: product.id } });

  return (
    <div>
      {product ? (
        <div className={styles.product}>
          <img src={product.images[0]} width="100%" />
          <Link to={`/productos/${product?.id}`}>
            <p className={styles.name}>{product.name}</p>
          </Link>
          <Rating
            reviews={productReviews.data?.productReviews}
            showNumberOfReviews={true}
          />
          <p className={styles.price}>
            {product.price} <small>€</small>
          </p>
          <Link to={`/productos/editar/${product?.id}`}>Editar</Link>
        </div>
      ) : null}
    </div>
  );
};

export default Product;
