import React from 'react';
import PropTypes from 'prop-types';
import { reviewProp } from '../review/review.prop';
import Review from '../review/review';

function ReviewsList(props) {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {reviews.map((review) => <Review key={review.date} review={review} />)}
    </ul>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp),
};

export default ReviewsList;
