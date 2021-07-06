import { ActionType } from '../action';
import { cities } from '../../const';
import { adaptOfferToClient } from '../../utils/adapter';

const initialState = {
  city: cities[0],
  offers: [],
  isDataLoaded: false,
};

const appData = (state = initialState, action) => {
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
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export { appData };
