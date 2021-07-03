import React from 'react';
import PropTypes from 'prop-types';
import { reviewProp } from '../review/review.prop';
import Review from '../review/review';

function ReviewsList(props) {
  const {reviews} = props;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp),
};

export default ReviewsList;
