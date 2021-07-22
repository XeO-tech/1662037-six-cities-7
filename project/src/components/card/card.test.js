import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import * as Redux from 'react-redux';
import Card from './card';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../const';

let history = null;
let store = null;
let dispatch = null;

let setFavoriteStatus = null;

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

const setting = {
  ARTICLE_CLASS: 'favorites__card place-card',
  MAIN_DIV_CLASS: 'favorites__image-wrapper place-card__image-wrapper',
  INFO_DIV_CLASS: 'favorites__card-info place-card__info',
  IMAGE_WIDTH: '150',
  IMAGE_HEIGHT: '110',
};

describe('Component: Card', () => {
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

    dispatch = jest.fn(() => Promise.resolve());
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    setFavoriteStatus = jest.fn();
  });

  it('should render the card with "Penthouse..." title', () => {
    const initialStateForFirstUseStateCall = [false];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteStatus]);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card offer={testOffer} setting={setting} />
        </Router>
      </Provider>);

    expect(screen.getByText('Penthouse...')).toBeInTheDocument();
  });

  it('should dispatch toggleFavorites function on favorites icon click', () => {
    const initialStateForFirstUseStateCall = [false];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteStatus]);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card offer={testOffer} setting={setting} />
        </Router>
      </Provider>);

    userEvent.click(document.querySelector('.place-card__bookmark-button'));
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should route to offer page when user click on offer\'s image', () => {
    const initialStateForFirstUseStateCall = [false];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteStatus]);

    history.push(AppRoute.ROOT);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <Card offer={testOffer} setting={setting} />
            </Route>
            <Route exact path={`/offer/${testOffer.id}`}>
              <div>Mock offer</div>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    userEvent.click(document.querySelector('.place-card__image'));
    expect(screen.getByText('Mock offer')).toBeInTheDocument();
  });

  it('should route to offer page when user click on offer\'s title', () => {
    const initialStateForFirstUseStateCall = [false];

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFavoriteStatus]);

    history.push(AppRoute.ROOT);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <Card offer={testOffer} setting={setting} />
            </Route>
            <Route exact path={`/offer/${testOffer.id}`}>
              <div>Mock offer</div>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    userEvent.click(screen.getByText(testOffer.title));
    expect(screen.getByText('Mock offer')).toBeInTheDocument();
  });
});
