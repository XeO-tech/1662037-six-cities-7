import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import * as Redux from 'react-redux';
import Room from './room';
import { cities, testOffer, testReviews, testOfferNearBy } from './room.test-mocks';
import userEvent from '@testing-library/user-event';

let history = null;
let store = null;
let fakeComponent = null;
let dispatch;

let setOfferInfo = null;
let setIsDataLoaded = null;
let setOffersNearBy = null;
let setReviews = null;

jest.mock('../map/map', () => {
  const mockMap = () => <>This is Map</>;
  return {
    __esModule: true,
    default: mockMap,
  };
});

jest.mock('../review-form/review-form', () => {
  const mockMap = () => <>This is ReviewForm</>;
  return {
    __esModule: true,
    default: mockMap,
  };
});

jest.mock('../card/card', () => {
  const mockMap = () => <>This is Card</>;
  return {
    __esModule: true,
    default: mockMap,
  };
});

describe('Component: Favorites', () => {
  const useSelectorMock = jest
    .spyOn(Redux, 'useSelector');

  beforeEach(() => {
    useSelectorMock.mockClear();

    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      APP_DATA: {
        city: cities[0],
        offers: [testOffer],
        isDataLoaded: true,
      },
    });

    dispatch = jest.fn(() => Promise.resolve());
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    setOfferInfo = jest.fn();
    setIsDataLoaded = jest.fn();
    setOffersNearBy = jest.fn();
    setReviews = jest.fn();

    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.AUTH);

    fakeComponent = (
      <Provider store={store}>
        <Router history={history}>
          <Room match={{params: {id: '1'}}}/>
        </Router>
      </Provider>
    );
  });

  it('should render "Loading..." when data is still loading from server', () => {
    const initialStateForFirstUseStateCall = null;
    const initialStateForSecondUseStateCall = false;
    const initialStateForThirdUseStateCall = [];
    const initialStateForForthUseStateCall = [];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setOfferInfo])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, setOffersNearBy])
      .mockReturnValueOnce([initialStateForForthUseStateCall, setReviews]);

    render(fakeComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render "Penthouse..." when receive data from server with such title', () => {
    const initialStateForFirstUseStateCall = testOffer;
    const initialStateForSecondUseStateCall = true;
    const initialStateForThirdUseStateCall = [];
    const initialStateForForthUseStateCall = [];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setOfferInfo])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, setOffersNearBy])
      .mockReturnValueOnce([initialStateForForthUseStateCall, setReviews]);

    render(fakeComponent);

    expect(screen.getByText('Penthouse...')).toBeInTheDocument();
  });

  it('should render "Reviews · 2" when receive data from server with 2 reviews', () => {
    const initialStateForFirstUseStateCall = testOffer;
    const initialStateForSecondUseStateCall = true;
    const initialStateForThirdUseStateCall = [];
    const initialStateForForthUseStateCall = testReviews;

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setOfferInfo])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, setOffersNearBy])
      .mockReturnValueOnce([initialStateForForthUseStateCall, setReviews]);

    render(fakeComponent);

    expect(document.querySelector('.reviews__amount').textContent).toEqual('2');
  });

  it('should render offer near by when receive data with offer  near by with such title from server', () => {
    const initialStateForFirstUseStateCall = testOffer;
    const initialStateForSecondUseStateCall = true;
    const initialStateForThirdUseStateCall = [testOfferNearBy];
    const initialStateForForthUseStateCall = [];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setOfferInfo])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, setOffersNearBy])
      .mockReturnValueOnce([initialStateForForthUseStateCall, setReviews]);

    render(fakeComponent);

    expect(screen.getByText('This is Card')).toBeInTheDocument();
  });
});
