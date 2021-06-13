import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
// import { reviews } from './mocks/reviews';
import { adaptOfferToClient } from './utils';

const Setting = {
  OFFERS_NUMBER: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offersNumber = {Setting.OFFERS_NUMBER}
      offers = {offers.map((offer) => adaptOfferToClient(offer))}
      // reviews = {reviews.map((review) => adaptReviewToClient(review))}
    />
  </React.StrictMode>,
  document.getElementById('root'));
