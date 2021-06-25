import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { adaptOfferToClient, adaptReviewToClient } from './utils';
import { reducer } from './store/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const Setting = {
  OFFERS_NUMBER: 5,
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersNumber = {Setting.OFFERS_NUMBER}
        offers = {offers.map((offer) => adaptOfferToClient(offer))}
        reviews = {reviews.map((review) => adaptReviewToClient(review))}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
