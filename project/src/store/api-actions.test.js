import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { ActionType } from './action';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { checkAuth, fetchOffersList, fetchOffer, fetchFavorites, toggleFavorites, login, logout} from './api-actions';

let api = null;


describe('Async oprations', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ApiRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@test.ru', password: '123456'};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(ApiRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({type: ActionType.LOGOUT});
      });
  });

  it('should make a correct API call to GET /hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchOffersListLoader = fetchOffersList();

    apiMock
      .onGet(ApiRoute.HOTELS)
      .reply(200, [{fake: true}]);

    return fetchOffersListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a redirect to \'/offer-not-found\'on API call to non-exsistence offer at GET /hotels/:hotel_id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 'test';
    const fetchOfferLoader = fetchOffer(offerId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}`)
      .reply(404);

    return fetchOfferLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: '/offer-not-found',
        });
      });
  });

  it('should make a redirect to sign-in page on API call to POST /favorite/:hotel_id/:status while being not logged in', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 'test';
    const isFavorite = false;
    const status = 1;
    const toggleFavoritesLoader = toggleFavorites(isFavorite, offerId);

    apiMock
      .onPost(`${ApiRoute.FAVORITE}/${offerId}/${status}`)
      .reply(401);

    return toggleFavoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN,
        });
      });
  });

  it('should make a redirect to sign-in page on API call to GET /favorite while being not logged in', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchFavoritesLoader = fetchFavorites();

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(401);

    return fetchFavoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN,
        });
      });
  });
});
