import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { adaptOfferToClient, adaptReviewToClient } from './components/utils/adapter';
import { reducer } from './store/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers = {offers.map((offer) => adaptOfferToClient(offer))}
        reviews = {reviews.map((review) => adaptReviewToClient(review))}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
