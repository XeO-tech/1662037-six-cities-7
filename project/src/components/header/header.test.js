import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import Header from './header';

let history = null;
let store = null;
let fakeComponent = null;
let dispatch = null;

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

describe('Component: Header', () => {
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
          <Header />
        </Router>
      </Provider>
    );
  });

  it('should render "Sign In" when user is unauthorized', () => {
    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.NO_AUTH);

    render(fakeComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render sign in page when user click on Sign in', () => {
    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.NO_AUTH);

    history.push('/header');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/header'}>
              <Header />
            </Route>
            <Route exact path={AppRoute.LOGIN}>
              <div>Mock sign in page</div>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(document.querySelector('.header__nav-link'));
    expect(screen.getByText('Mock sign in page')).toBeInTheDocument();
  });

  it('should render user login when user is authorized', () => {
    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.AUTH);
    Storage.prototype.getItem = jest.fn(() => 'user@test.ru');

    render(fakeComponent);

    expect(screen.getByText('user@test.ru')).toBeInTheDocument();
  });

  it('should render favorites page when user click on his login', () => {
    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.AUTH);
    Storage.prototype.getItem = jest.fn(() => 'user@test.ru');
    history.push('/header');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/header'}>
              <Header />
            </Route>
            <Route exact path={AppRoute.FAVORITES}>
              <div>Mock favorites</div>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText('user@test.ru'));
    expect(screen.getByText('Mock favorites')).toBeInTheDocument();
  });

  it('should dispatch logout when user click sign out', () => {
    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.AUTH);
    Storage.prototype.getItem = jest.fn(() => 'user@test.ru');

    render(fakeComponent);

    userEvent.click(screen.getByText('Sign out'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should render main page when user click on logo', () => {
    useSelectorMock.mockReturnValueOnce(AuthorizationStatus.AUTH);
    Storage.prototype.getItem = jest.fn(() => 'user@test.ru');
    history.push('/header');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/header'}>
              <Header />
            </Route>
            <Route exact path={AppRoute.ROOT}>
              <div>Mock main page</div>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(document.querySelector('.header__logo'));
    expect(screen.getByText('Mock main page')).toBeInTheDocument();
  });
});
