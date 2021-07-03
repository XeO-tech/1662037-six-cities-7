import { fetchOffersList, checkAuth } from '../../store/api-actions';


export const init = () => (dispatch, _getState, _api) => {
  dispatch(fetchOffersList());
  dispatch(checkAuth());
};
