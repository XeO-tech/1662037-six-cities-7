import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import * as Redux from 'react-redux';
import Favorites from './favorites';

let history = null;
let store = null;

let setFavoriteOffers = null;
let setIsDataLoaded = null;
let isError = null;

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const testOffer = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  images: ['https://7.react.pages.academy/static/hotel/12.jpg'],
  title: 'Penthouse...',
  rating: 4.3,
  type: 'hotel',
  bedrooms: 3,
  price: 291,
  goods: [ 'Towels', 'Fridge'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: true,
    id: 25,
    name: 'Angelina',
  },
  description: 'I rent out...',
  location: {
    latitude: 48.83961,
    longitude: 2.342499,
    zoom: 16,
  },
  id: 1,
  isFavorite: false,
  isPremium: false,
  maxAdults: 8,
  previewImage: 'https://7.react.pages.academy/static/hotel/15.jpg',
};

describe('Component: Favorites', () => {
  beforeEach(() => {
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

    const dispatch = jest.fn(() => Promise.resolve());
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    setFavoriteOffers = jest.fn();
    setIsDataLoaded = jest.fn();
    isError = jest.fn();
  });

  it('should render "Saved listing" when receive data with offers from server', () => {
    const initialStateForFirstUseStateCall = [testOffer];
    const initialStateForSecondUseStateCall = true;
    const initialStateForThirdUseStateCall = false;

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteOffers])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, isError]);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "Nothing yet saved" when receive empty data from server', () => {
    const initialStateForFirstUseStateCall = [];
    const initialStateForSecondUseStateCall = true;
    const initialStateForThirdUseStateCall = false;

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteOffers])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, isError]);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render "Loading..." when data is loading', () => {
    const initialStateForFirstUseStateCall = [];
    const initialStateForSecondUseStateCall = false;
    const initialStateForThirdUseStateCall = false;

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteOffers])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setIsDataLoaded])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, isError]);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
