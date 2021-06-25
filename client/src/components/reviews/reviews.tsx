import React from "react";
import Rating from "../rating/rating";

interface ReviewsProps {
  reviews?: any;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews?.map((review: any) => (
        <div>
          <span>User</span>
          <h3>
            <Rating reviews={[review]} showNumberOfReviews={false} />
            {review.title}
          </h3>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
