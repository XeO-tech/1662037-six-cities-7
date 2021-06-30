import { SortingType } from '../const';
import { AuthorizationStatus } from '../const';

export const defineRatingWidth = (rating) => `${Math.round(rating)*20}%`;

export const sortOffersByPriceAscending = (offers) =>
  [...offers].sort((a,b) => a.price - b.price);

export const sortOffersByPriceDescending = (offers) =>
  [...offers].sort((a,b) => b.price - a.price);

export const sortOffersByRating = (offers) =>
  [...offers].sort((a,b) => b.rating - a.rating);

export const getFilteredOffers = (offers, city) => offers.filter((offer) => offer.city.name === city);

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