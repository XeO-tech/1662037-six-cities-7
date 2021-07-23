import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { cities, testOffers, setting } from './offers-list.test-mocks';
import { AuthorizationStatus } from '../../const';
import OffersList from './offers-list';

let history = null;
let store = null;
let onListItemHover = null;
let onListItemLeave = null;

describe('Component: OffersList', () => {
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

    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersList offers={testOffers} setting={setting} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
        </Router>
      </Provider>,
    );
  });

  it('should render both provided offers', () => {
    expect(screen.getByText('Penthouse...')).toBeInTheDocument();
    expect(screen.getByText('Big house')).toBeInTheDocument();
  });

  it('should fire hover callback on card hover', () => {
    userEvent.hover(document.querySelector('.place-card__image'));
    expect(onListItemHover).toBeCalled();
  });

  it('should fire unhover callback on card unhover', () => {
    userEvent.unhover(document.querySelector('.place-card__image'));
    expect(onListItemLeave).toBeCalled();
  });
});
