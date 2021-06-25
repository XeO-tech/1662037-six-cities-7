import { ActionType } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../const';
import { adaptOfferToClient } from '../utils';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));

const initialState = {
  city: cities[0],
  offers: adaptedOffers.filter((offer) => offer.city.name === cities[0]),
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
        offers: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
