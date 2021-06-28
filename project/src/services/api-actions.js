import { ActionCreator } from '../store/action';
import { AuthorizationStatus, ApiRoute } from '../const';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);
