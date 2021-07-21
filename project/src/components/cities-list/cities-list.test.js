import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';

let history = null;
let store = null;
let fakeComponent = null;
let dispatch = null;

const cities = ['Paris', 'Cologne', 'Brussels'];

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
        offers: [],
        isDataLoaded: true,
      },
    });

    dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    fakeComponent = (
      <Provider store={store}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>
    );
  });

  it('should render cities list in the document', () => {

    useSelectorMock.mockReturnValueOnce(cities[0]);

    render(fakeComponent);

    expect(screen.getByText(cities[0])).toBeInTheDocument();
    expect(screen.getByText(cities[1])).toBeInTheDocument();
  });

  it('should higlight active city by adding active class', () => {

    useSelectorMock.mockReturnValueOnce(cities[0]);

    render(fakeComponent);

    expect(document.querySelector('.tabs__item--active')).toBeInTheDocument();
  });

  it('should dispatch a changeCity function on city click', () => {

    useSelectorMock.mockReturnValueOnce(cities[0]);

    render(fakeComponent);

    userEvent.click(screen.getByText(/Paris/i));
    userEvent.click(screen.getByText(/Cologne/i));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
