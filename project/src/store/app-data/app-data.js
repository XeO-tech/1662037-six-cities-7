import { cities } from '../../const';
import { adaptOfferToClient } from '../../utils/adapter';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from '../action';

const initialState = {
  city: cities[0],
  offers: [],
  isDataLoaded: false,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload.map((offer) => adaptOfferToClient(offer));
      state.isDataLoaded = true;
    });
});

export { appData };
