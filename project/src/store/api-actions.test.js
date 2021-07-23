import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { ActionType } from './action';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { inputOffer, outputOffer, inputReview, outputReview } from './api-actions.test-mocks';
import { checkAuth, fetchOffersList, fetchOffersNearBy, fetchOffer, fetchReviews, fetchFavorites, toggleFavorites, login, logout} from './api-actions';

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

  it('should delete token and login from store in case of 401 status of API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ApiRoute.LOGIN)
      .reply(401);

    Storage.prototype.removeItem = jest.fn();

    return checkAuthLoader(() => {}, () => {}, api)
      .then(() => {
        expect(Storage.prototype.removeItem).toBeCalledTimes(2);
        expect(Storage.prototype.removeItem).nthCalledWith(1, 'token');
        expect(Storage.prototype.removeItem).nthCalledWith(2, 'login');
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@test.ru', password: '123456'};
    const fakeToken = 'test';
    const loginLoader = login(fakeUser);

    Storage.prototype.setItem = jest.fn();

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, {token: fakeToken, email: fakeUser.email});

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

        expect(Storage.prototype.setItem).toBeCalledTimes(2);
        expect(Storage.prototype.setItem).nthCalledWith(1, 'token', fakeToken);
        expect(Storage.prototype.setItem).nthCalledWith(2, 'login', fakeUser.email);
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    Storage.prototype.removeItem = jest.fn();

    apiMock
      .onDelete(ApiRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({type: ActionType.LOGOUT});

        expect(Storage.prototype.removeItem).toBeCalledTimes(2);
        expect(Storage.prototype.removeItem).nthCalledWith(1, 'token');
        expect(Storage.prototype.removeItem).nthCalledWith(2, 'login');
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

  it('should make a correct API call to GET /hotels/:id', () => {
    const apiMock = new MockAdapter(api);
    const offerId = 1;
    const fetchOfferLoader = fetchOffer(offerId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}`)
      .reply(200, inputOffer);

    return fetchOfferLoader(() => {}, () => {}, api)
      .then((data) => {
        expect(data).toEqual(outputOffer);
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

  it('should make a correct API call to GET /hotels/:id/nearby', () => {
    const apiMock = new MockAdapter(api);
    const offerId = 1;
    const fetchOffersNearByLoader = fetchOffersNearBy(offerId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}/nearby`)
      .reply(200, [inputOffer, inputOffer]);

    return fetchOffersNearByLoader(() => {}, () => {}, api)
      .then((data) => {
        expect(data).toEqual([outputOffer, outputOffer]);
      });
  });

  it('should make a correct API call to GET /comments/:id', () => {
    const apiMock = new MockAdapter(api);
    const offerId = 1;
    const fetchReviewsLoader = fetchReviews(offerId);

    apiMock
      .onGet(`${ApiRoute.REVIEWS}/${offerId}`)
      .reply(200, [inputReview, inputReview]);

    return fetchReviewsLoader(() => {}, () => {}, api)
      .then((data) => {
        expect(data).toEqual([outputReview, outputReview]);
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

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);
    const offerId = 1;
    const fetchFavoritesLoader = fetchFavorites(offerId);

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, [inputOffer, inputOffer]);

    return fetchFavoritesLoader(() => {}, () => {}, api)
      .then((data) => {
        expect(data).toEqual([outputOffer, outputOffer]);
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
