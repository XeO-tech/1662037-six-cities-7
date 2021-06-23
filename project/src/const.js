export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  ROOT: '/',
};

export const roomTypeAlias = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
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

