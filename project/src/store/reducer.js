import { ActionType } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../const';

const initialState = {
  city: cities[0],
  offers,
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
