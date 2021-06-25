import {
  ProductDetails,
  ProductDetailsVariables,
} from "../../queries/product/__generated__/ProductDetails";
import {
  GetProductReviews,
  GetProductReviewsVariables,
} from "../../queries/product-review/__generated__/GetProductReviews";

import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { useQuery } from "@apollo/client";

import { GET_PRODUCT_DETAILS } from "../../queries/product";
import styles from "./product-details.module.scss";
import Rating from "../../components/rating/rating";
import { GET_PRODUCT_REVIEWS } from "../../queries/product-review";
import Reviews from "../../components/reviews/reviews";

interface ProductProps extends RouteComponentProps {
  productId?: any; // TODO: give type
  apolloClient: any; // TODO: give type
}

const ProductDetail: React.FC<ProductProps> = ({ productId }) => {
  const product = useQuery<ProductDetails, ProductDetailsVariables>(
    GET_PRODUCT_DETAILS,
    { variables: { productId } }
  );

  const productReviews = useQuery<
    GetProductReviews,
    GetProductReviewsVariables
  >(GET_PRODUCT_REVIEWS, { variables: { productId } });
  
  if (product.loading) return <p>Cargando...</p>;
  if (product.error) return <p>ERROR: {product.error.message}</p>;
  if (!product.data) return <p>No hay datos que mostrar</p>;

  const productDetails = product.data.product
    ? product.data.product
    : undefined;

  return (
    <div className={styles.productDetails}>
      <div className={styles.main}>
        <div className={styles.images}>
          <div>
            {productDetails?.images.map((url, index) => (
              <div key={index}>
                <img src={url} width="100px" />
              </div>
            ))}
          </div>
          <div>
            <img src={productDetails?.images[0]} width="400px" />
          </div>
        </div>
        <div>
          <h1 className={styles.name}>{productDetails?.name}</h1>
          <Rating
            active={false}
            reviews={productReviews.data?.productReviews}
            showNumberOfReviews={true}
          />
          <div className={styles.price}>
            {productDetails?.price} <small>€</small>
          </div>
          <div className={styles.description}>
            {productDetails?.description}
          </div>
        </div>
      </div>
      <div className="reviews">
        <h1>Opiniones</h1>
        <Reviews reviews={productReviews.data?.productReviews} />
        <Link to={`/productos/crear-resena/${productDetails?.id}`}>
          Escribe una opinion
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
