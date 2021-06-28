export const ActionType = {
  CHANGE_CITY: 'app/changeCity',
  LOAD_QUESTIONS: 'data/questions',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: offers,
  }),
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
};
