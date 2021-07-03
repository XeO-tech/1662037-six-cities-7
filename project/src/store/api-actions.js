import { ActionCreator } from './action';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', email);
    })
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    })
    .then(() => dispatch(ActionCreator.logout()))
);

export const fetchOffer = (offerId) => (_dispatch, _getState, api) =>
  api.get(`${ApiRoute.HOTELS}/${offerId}`);

export const fetchOffersNearBy = (offerId) => (_dispatch, _getState, api) =>
  api.get(`${ApiRoute.HOTELS}/${offerId}/nearby`);

export const fetchReviews = (offerId) => (_dispatch, _getState, api) =>
  api.get(`${ApiRoute.COMMENTS}/${offerId}`);


