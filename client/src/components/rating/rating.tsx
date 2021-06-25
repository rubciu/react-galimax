import { GetProductReviews_productReviews } from "../../queries/product-review/__generated__/GetProductReviews";

import React, { useState, useEffect } from "react";
import styles from "./rating.module.scss";

interface RatingProps {
  active?: boolean;
  reviews?: any; // TODO use type
  handleClick?: any; // TODO use type
  showNumberOfReviews?: boolean;
}

interface Star {
  active: boolean;
}

const Rating: React.FC<RatingProps> = ({ active, handleClick, reviews, showNumberOfReviews }) => {
  const [stars, setStars] = useState<Array<Star>>([]);
  const [currentScore, setScore] = useState<number>(0);

  const getStars = (currentScore: number = -1) => {
    let stars: Array<Star> = [];

    for (let i = 0; i < 5; i++) {
      stars.push({
        active: i <= currentScore - 1,
      });
    }

    return stars;
  };

  const afterClick = (index: number) => {
    handleClick(index + 1);
    setScore(index + 1);
  };

  const calculateScore = (
    reviews: GetProductReviews_productReviews[] | undefined
  ): number =>
    reviews?.length
      ? Math.round(
          reviews.map((review) => review.score).reduce((a, b) => a + b) /
            reviews.length
        )
      : 0;

  useEffect(() => {
    const totalScore: number = calculateScore(reviews);

    setScore(totalScore);
    setStars(getStars(totalScore));
  }, [reviews]);

  useEffect(() => {
    setStars(getStars(currentScore));
  }, [currentScore]);

  const renderStars = () => {
    return stars.map((star, index) => (
      <span
        key={index}
        className={`${styles.star} ${star.active ? styles.active : ""}`}
        onClick={() => afterClick(index)}
      >
        ☆
      </span>
    ));
  };

  return (
    <div className={styles.rating}>
      <div className={`${styles.stars} ${!active ? styles.readonly : null}`}>
        {renderStars()}
      </div>
      {showNumberOfReviews ? (
        <span className={styles.reviews}>({reviews?.length})</span>
      ) : null}
    </div>
  );
};

export default Rating;
