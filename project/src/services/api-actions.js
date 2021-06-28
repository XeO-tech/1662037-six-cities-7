import { ActionCreator } from '../store/action';
import { ApiRoute } from '../const';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const fetchReviewsList = (reviewID) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.COMMENTS}/${reviewID}`)
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
);
