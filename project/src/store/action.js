import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'app/changeCity',
  LOAD_OFFERS: 'data/offers',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'app/redirect',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (newCity) => ({
  payload: newCity,
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const requireAuthorization = createAction(ActionType.REQUIRE_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const logout = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));
