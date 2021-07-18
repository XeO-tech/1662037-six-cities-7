export const inputOffer = {
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
};

export const outputOffer = {
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
};

export const inputReview = {
  'id':1,
  'user': {
    'avatar_url':'https://7.react.pages.academy/static/avatar/7.jpg',
    'is_pro':true,
    'id':16,
    'name':
    'Mollie',
  },
  'rating':3,
  'comment':'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)','date':'2021-06-30T16:51:35.215Z',
};

export const outputReview = {
  'id':1,
  'user': {
    'avatarUrl':'https://7.react.pages.academy/static/avatar/7.jpg',
    'isPro':true,
    'id':16,
    'name':
    'Mollie',
  },
  'rating':3,
  'comment':'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)','date':'2021-06-30T16:51:35.215Z',
};
