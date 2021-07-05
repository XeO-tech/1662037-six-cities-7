export const selectOffersByCity = (offers, city) => offers.filter((offer) => offer.city.name === city);
