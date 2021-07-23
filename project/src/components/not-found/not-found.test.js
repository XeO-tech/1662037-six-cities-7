import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../const';

jest.mock('../header/header', () => {
  const mockMap = () => <>This is Header</>;
  return {
    __esModule: true,
    default: mockMap,
  };
});

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );
    const headerElement = getByText('404. Page not found');
    const linkElement = getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should render main page on link click', () => {
    const history = createMemoryHistory();
    history.push('/not-found-page');

    render(
      <Router history={history}>
        <Switch>
          <Route exact path={'/not-found-page'}>
            <NotFound />
          </Route>
          <Route exact path={AppRoute.ROOT}>
            <div>Mock main page</div>
          </Route>
        </Switch>
      </Router>,
    );

    userEvent.click(screen.getByText('Вернуться на главную'));
    expect(screen.getByText('Mock main page')).toBeInTheDocument();
  });
});
