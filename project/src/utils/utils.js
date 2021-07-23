import { AuthorizationStatus, SortingType } from '../const';

export const defineRatingWidth = (rating) => {
  if (rating >= 5) {
    return '100%';
  }

  if (rating === undefined || rating <= 0) {
    return '0%';
  }

  return `${Math.round(rating)*20}%`;
};

export const sortOffersByPriceAscending = (offers) =>
  [...offers].sort((a,b) => a.price - b.price);

export const sortOffersByPriceDescending = (offers) =>
  [...offers].sort((a,b) => b.price - a.price);

export const sortOffersByRating = (offers) =>
  [...offers].sort((a,b) => b.rating - a.rating);

export const sortOffers = (activeSorting, offers) => {
  let sortedOffers;

  switch (activeSorting) {
    case SortingType.PRICE_ASCENDING:
      sortedOffers = sortOffersByPriceAscending(offers);
      break;
    case SortingType.PRICE_DESCENDING:
      sortedOffers = sortOffersByPriceDescending(offers);
      break;
    case SortingType.RATING:
      sortedOffers = sortOffersByRating(offers);
      break;
    default:
      sortedOffers = [...offers];
  }
  return sortedOffers;
};

export const isAuthUnknown = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

export const isEmailAddress = (email) => {
  const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return emailRegExp.test(email);
};

export const isPassword = (password) => {
  const passwordRegExp = /^(?!\s*$).+/;

  return passwordRegExp.test(password);
};
