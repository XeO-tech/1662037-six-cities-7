import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import * as Redux from 'react-redux';
import MainPage from './main-page';
import { SortingType } from '../../const';

let history = null;
let store = null;
let fakeComponent = null;

let setActiveCardId = null;
let setActiveSorting = null;

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

jest.mock('../map/map', () => {
  const mockMap = () => <>This is Map</>;
  return {
    __esModule: true,
    default: mockMap,
  };
});

describe('Component: MainPage', () => {
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

    setActiveCardId = jest.fn();
    setActiveSorting = jest.fn();

    fakeComponent = (
      <Provider store={store}>
        <Router history={history}>
          <MainPage />
        </Router>
      </Provider>
    );
  });

  it('should render "No places to stay available" when receive empty data  from server', () => {
    const initialStateForFirstUseStateCall = null;
    const initialStateForSecondUseStateCall = SortingType.POPULAR;

    useSelectorMock
      .mockReturnValueOnce([])
      .mockReturnValueOnce('Paris');

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setActiveCardId])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setActiveSorting]);

    render(fakeComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render "1 places to stay in Paris" when receive data with 1 offer in Paris from server', () => {
    const initialStateForFirstUseStateCall = null;
    const initialStateForSecondUseStateCall = SortingType.POPULAR;

    useSelectorMock
      .mockReturnValueOnce([testOffer])
      .mockReturnValueOnce('Paris');

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setActiveCardId])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, setActiveSorting]);

    render(fakeComponent);

    expect(screen.getByText('1 places to stay in Paris')).toBeInTheDocument();
  });
});
