import { NameSpace } from '../root-reducer';

export const getCity = (state) =>  state[NameSpace.APP_DATA].city;

export const getOffers = (state) =>  state[NameSpace.APP_DATA].offers;

export const getLoadedDataStatus = (state) => state[NameSpace.APP_DATA].isDataLoaded;
