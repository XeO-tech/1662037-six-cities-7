import { offers } from '../mocks/offers';
import { adaptOfferToClient } from '../utils';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));

export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS_LIST: 'FILL_OFFERS_LIST',
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),
  fillOffersList: (newCity) => ({
    type: ActionType.FILL_OFFERS_LIST,
    payload: adaptedOffers.filter((offer) => offer.city.name === newCity),
  }),
};
