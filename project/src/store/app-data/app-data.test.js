import { ActionType } from '../action';
import { appData } from './app-data';

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const inputOffers = [{
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  images: ['https://7.react.pages.academy/static/hotel/12.jpg'],
  title: 'Penthouse...',
  rating: 4.3,
  type: 'hotel',
  bedrooms: 3,
  price: 291,
  goods: [ 'Towels', 'Fridge'],
  host: {
    'avatar_url': 'img/avatar-angelina.jpg',
    'is_pro': true,
    id: 25,
    name: 'Angelina',
  },
  description: 'I rent out...',
  location: {
    latitude: 48.83961,
    longitude: 2.342499,
    zoom: 16,
  },
  id: 1,
  'is_favorite': false,
  'is_premium': false,
  'max_adults': 8,
  'preview_image': 'https://7.react.pages.academy/static/hotel/15.jpg',
}];

const outputOffers = [{
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  images: ['https://7.react.pages.academy/static/hotel/12.jpg'],
  title: 'Penthouse...',
  rating: 4.3,
  type: 'hotel',
  bedrooms: 3,
  price: 291,
  goods: [ 'Towels', 'Fridge'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: true,
    id: 25,
    name: 'Angelina',
  },
  description: 'I rent out...',
  location: {
    latitude: 48.83961,
    longitude: 2.342499,
    zoom: 16,
  },
  id: 1,
  isFavorite: false,
  isPremium: false,
  maxAdults: 8,
  previewImage: 'https://7.react.pages.academy/static/hotel/15.jpg',
}];

describe('Reducer: appData', () => {
  it('without additional parameters should return initial state', () => {
    expect (appData(undefined, {}))
      .toEqual({
        city: cities[0],
        offers: [],
        isDataLoaded: false,
      });
  });

  it('should update offers by loadOffers action', () => {
    const state = {
      offers: [],
      isDataLoaded: false,
    };
    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: inputOffers,
    };

    expect(appData(state, loadOffersAction))
      .toEqual({offers: outputOffers, isDataLoaded: true});
  });

  it('should change city by changeCity action', () => {
    const state = {city: cities[0]};

    const changeCity ={
      type: ActionType.CHANGE_CITY,
      payload: cities[1],
    };

    expect(appData(state, changeCity))
      .toEqual({city: cities[1]});
  });
});

