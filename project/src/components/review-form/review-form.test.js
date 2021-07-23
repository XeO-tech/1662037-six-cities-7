import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../const';
import ReviewForm from './review-form';

let history = null;
let store = null;
let dispatch = null;
let fakeComponent = null;
let initReviewsUpdate = null;

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
describe('Component: ReviewForm', () => {

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

    dispatch = jest.fn(() => Promise.resolve());
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    initReviewsUpdate = jest.fn();

    fakeComponent = (
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId={1} initReviewsUpdate={initReviewsUpdate}/>
        </Router>
      </Provider>
    );
  });

  it('should render comment form with "Your review" text and disabled submit button', () => {
    render(fakeComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(document.querySelector('.reviews__submit').disabled).toEqual(true);
  });

  it('should enable submit button when comment with more than 50 characters is typed and rating is set', () => {
    render(fakeComponent);

    userEvent.click(document.getElementById('2-stars'));
    userEvent.type(screen.getByRole('textbox'), 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)');
    expect(document.querySelector('.reviews__submit').disabled).toEqual(false);
  });

  it('should dispatch comment on submit button click', () => {
    const initialStateForFirstUseStateCall = {
      rating:'',
      comment:'',
    };

    const setFormData = jest.fn();

    React.useState = jest.fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, setFormData]);

    render(fakeComponent);
    document.querySelector('.reviews__submit').disabled = false;
    userEvent.click(document.querySelector('.reviews__submit'));

    expect(dispatch).toBeCalledTimes(1);
  });
});

