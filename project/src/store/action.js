export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS_LIST: 'FILL_OFFERS_LIST',
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),
  fillOffersList: (newCity, offers) => ({
    type: ActionType.FILL_OFFERS_LIST,
    payload: offers.filter((offer) => offer.city.name === newCity.name),
  }),
};
