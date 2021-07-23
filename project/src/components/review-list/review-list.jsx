import React from 'react';
import PropTypes from 'prop-types';
import { reviewProp } from '../review/review.prop';
import Review from '../review/review';

const MAX_REVIEWS = 10;

const normalizeReviews = (rawReviews) => {
  if (!rawReviews) {
    return;
  }
  const sortedReviews = [...rawReviews]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return sortedReviews.slice(0, MAX_REVIEWS);
};

function ReviewsList(props) {
  const {reviews} = props;
  const normalizedReviews = normalizeReviews(reviews);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {normalizedReviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp),
};

export default React.memo(ReviewsList);
