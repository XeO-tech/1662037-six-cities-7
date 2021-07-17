import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { adaptOfferToClient, adaptReviewToClient } from '../utils/adapter';
import { loadOffers, requireAuthorization, redirectToRoute, logout as CloseSession  } from './action';
import { HttpCode } from '../services/api';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({data}) => dispatch(loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', email);
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    })
    .then(() => dispatch(CloseSession()))
);

export const fetchOffer = (offerId) => (dispatch, _getState, api) =>
  api.get(`${ApiRoute.HOTELS}/${offerId}`)
    .then(({data}) => adaptOfferToClient(data))
    .catch(() => dispatch(redirectToRoute('/offer-not-found')));

export const fetchOffersNearBy = (offerId) => (_dispatch, _getState, api) =>
  api.get(`${ApiRoute.HOTELS}/${offerId}/nearby`)
    .then(({data}) => data.map((offerItem) => adaptOfferToClient(offerItem)))
    .catch(() => {});

export const fetchReviews = (offerId) => (_dispatch, _getState, api) =>
  api.get(`${ApiRoute.REVIEWS}/${offerId}`)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)))
    .catch(() => {});

export const postComment = (offerId, comment) => (_dispatch, _getState, api) =>
  api.post(`${ApiRoute.REVIEWS}/${offerId}`, comment);

export const toggleFavorites = (isFavorite, offerId) => (dispatch, _getState, api) => {
  let status;
  isFavorite ? status = 0 : status = 1;

  return api.post(`${ApiRoute.FAVORITE}/${offerId}/${status}`)
    .then(({data}) => adaptOfferToClient(data))
    .catch((err) => {
      if (err.response.status === HttpCode.UNATHORIZED) {
        dispatch(redirectToRoute(AppRoute.LOGIN));
      }
    });
};

export const fetchFavorites = () => (dispatch, _getState, api) =>
  api.get(ApiRoute.FAVORITE)
    .then(({data}) => data.map((offerItem) => adaptOfferToClient(offerItem)))
    .catch((err) => {
      if (err.response.status === HttpCode.UNATHORIZED) {
        dispatch(redirectToRoute(AppRoute.LOGIN));
        return;
      }
      throw new Error('Can\'t load favorites');
    });

