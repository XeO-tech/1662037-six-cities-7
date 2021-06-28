export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  ROOT: '/',
};

export const ApiRoute = {
  HOTELS: '/hotels',
  FAVORITE: '/favorite',
  COMMENTS: '/commetns/:hotel_id',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const roomTypeAlias = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export const SortingType = {
  POPULAR: 'Popular',
  PRICE_ASCENDING: 'Price: low to high',
  PRICE_DESCENDING: 'Price: high to low',
  RATING: 'Top rated first',
};

export const CardSetting = {
  favoritesPage: {
    ARTICLE_CLASS: 'favorites__card place-card',
    MAIN_DIV_CLASS: 'favorites__image-wrapper place-card__image-wrapper',
    INFO_DIV_CLASS: 'favorites__card-info place-card__info',
    IMAGE_WIDTH: '150',
    IMAGE_HEIGHT: '110',
  },
  mainPage: {
    ARTICLE_CLASS: 'cities__place-card place-card',
    MAIN_DIV_CLASS: 'cities__image-wrapper place-card__image-wrapper',
    INFO_DIV_CLASS: 'place-card__info',
    IMAGE_WIDTH: '260',
    IMAGE_HEIGHT: '200',
  },
  offerPage: {
    ARTICLE_CLASS: 'near-places__card place-card',
    MAIN_DIV_CLASS: 'near-places__image-wrapper place-card__image-wrapper',
    INFO_DIV_CLASS: 'place-card__info',
    IMAGE_WIDTH: '260',
    IMAGE_HEIGHT: '200',
  },
};

