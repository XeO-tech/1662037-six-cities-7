import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import OffersList from './offers-list';
import { cities, testOffers, setting } from './offers-list.test-mocks';

let history = null;
let store = null;
let fakeComponent = null;
let onListItemHover = null;
let onListItemLeave = null;

describe('Component: Favorites', () => {

  beforeEach(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      APP_DATA: {
        city: cities[0],
        offers: [],
        isDataLoaded: true,
      },
    });

    onListItemHover = jest.fn();
    onListItemLeave = jest.fn();

    fakeComponent = (
      <Provider store={store}>
        <Router history={history}>
          <OffersList offers={testOffers} setting={setting} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
        </Router>
      </Provider>
    );
  });

  it('should render both provided offers', () => {
    render(fakeComponent);

    expect(screen.getByText('Penthouse...')).toBeInTheDocument();
    expect(screen.getByText('Big house')).toBeInTheDocument();
  });

  it('should fire hover callback on card hover', () => {
    render(fakeComponent);

    userEvent.hover(document.querySelector('.place-card__image'));
    expect(onListItemHover).toBeCalled();
  });

  it('should fire unhover callback on card unhover', () => {
    render(fakeComponent);

    userEvent.unhover(document.querySelector('.place-card__image'));
    expect(onListItemLeave).toBeCalled();
  });
});
