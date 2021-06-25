import { ActionType } from './action';
import { offers } from '../mocks/offers';
import { defaultCity } from '../const';

const initialState = {
  city: defaultCity,
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
