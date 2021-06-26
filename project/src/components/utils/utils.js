export const defineRatingWidth = (rating) => `${Math.round(rating)*20}%`;

export const sortOffersByPriceAscending = (offers) =>
  [...offers].sort((a,b) => a.price - b.price);

export const sortOffersByPriceDescending = (offers) =>
  [...offers].sort((a,b) => b.price - a.price);

export const sortOffersByRating = (offers) =>
  [...offers].sort((a,b) => b.rating - a.rating);
