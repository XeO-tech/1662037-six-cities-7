import { ActionType } from './action';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { cities } from '../const';
import { adaptOfferToClient, adaptReviewToClient } from '../components/utils/adapter';
import { SortingType } from '../const';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));
const adaptedReviews = reviews.map((review) => adaptReviewToClient(review));
const initialStateOffers = adaptedOffers.filter((offer) => offer.city.name === cities[0]);

const initialState = {
  city: cities[0],
  offers: adaptedOffers,
  reviews: adaptedReviews,
  defaultSortedOffers: initialStateOffers,
  sortedOffers: initialStateOffers,
  activeSorting: SortingType.POPULAR,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.FILL_OFFERS_LIST:
      return {
        ...state,
        sortedOffers: action.payload,
        defaultSortedOffers: action.payload,
        activeSorting: SortingType.POPULAR,
      };
    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        activeSorting: action.payload.newSorting,
        sortedOffers: action.payload.sortedOffers,
      };
    default:
      return state;
  }
};

export { reducer };
