import { ActionType } from './action';
import { cities } from '../const';
import { AuthorizationStatus } from '../const';
import { adaptOfferToClient, adaptReviewToClient } from '../utils/adapter';

const initialState = {
  city: cities[0],
  offers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload.map((offer) => adaptOfferToClient(offer)),
      };
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload.map((review) => adaptReviewToClient(review)),
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export { reducer };
