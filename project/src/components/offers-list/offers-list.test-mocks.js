export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const testOffers = [
  {
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
  },
  {
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    images: ['https://7.react.pages.academy/static/hotel/12.jpg'],
    title: 'Big house',
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
    id: 2,
    isFavorite: false,
    isPremium: false,
    maxAdults: 8,
    previewImage: 'https://7.react.pages.academy/static/hotel/15.jpg',
  },
];

export const setting = {
  ARTICLE_CLASS: 'favorites__card place-card',
  MAIN_DIV_CLASS: 'favorites__image-wrapper place-card__image-wrapper',
  INFO_DIV_CLASS: 'favorites__card-info place-card__info',
  IMAGE_WIDTH: '150',
  IMAGE_HEIGHT: '110',
};
