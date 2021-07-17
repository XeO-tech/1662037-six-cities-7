import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';

const mockStore = configureStore({});

describe('Component: SignIn', () => {
  it('should render "SignIn" component when user navigate to "login" url', () => {
    const history = createMemoryHistory();
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

    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
