import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';
import { AppRoute } from '../../const';

const mockStore = configureStore({});
let history = null;

describe('Component: SignIn', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should render "SignIn" component when user navigate to "login" url', () => {

    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('sign-in')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
  });

  it('should render main page when user click on logo', () => {
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/login'}>
              <SignIn />
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
