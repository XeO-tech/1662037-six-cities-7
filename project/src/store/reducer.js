import { ActionType } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../const';
import { adaptOfferToClient } from '../components/utils/adapter';
import { SortingType } from '../const';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));

const initialState = {
  city: cities[0],
  filteredOffers: adaptedOffers.filter((offer) => offer.city.name === cities[0]),
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
        filteredOffers: action.payload,
      };
    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        activeSorting: action.payload.newSorting,
        filteredOffers: action.payload.sortedOffers,
      };
    default:
      return state;
  }
};

export { reducer };
