import { ActionType } from './action';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { cities } from '../const';
import { adaptOfferToClient, adaptReviewToClient } from '../utils/adapter';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));
const adaptedReviews = reviews.map((review) => adaptReviewToClient(review));

const initialState = {
  city: cities[0],
  offers: adaptedOffers,
  reviews: adaptedReviews,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
