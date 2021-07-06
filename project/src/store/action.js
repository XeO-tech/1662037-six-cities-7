export const ActionType = {
  CHANGE_CITY: 'app/changeCity',
  LOAD_OFFERS: 'data/offers',
  LOAD_REVIEWS: 'data/reviews',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'app/redirect',
};

export const changeCity = (newCity) => ({
  type: ActionType.CHANGE_CITY,
  payload: newCity,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
});

export const loadReviews = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRE_AUTHORIZATION,
  payload: status,
});

export const logout = () => ({
  type: ActionType.LOGOUT,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
