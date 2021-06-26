import { offers } from '../mocks/offers';
import { adaptOfferToClient } from '../components/utils/adapter';
import { SortingType } from '../const';
import { sortOffersByPriceAscending, sortOffersByPriceDescending, sortOffersByRating } from '../components/utils/utils';


const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));

export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS_LIST: 'FILL_OFFERS_LIST',
  CHANGE_SORTING: 'CHANGE_SORTING',
};

export const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),
  fillOffersList: (newCity) => ({
    type: ActionType.FILL_OFFERS_LIST,
    payload: adaptedOffers.filter((offer) => offer.city.name === newCity),
  }),
  changeSorting: (newSorting, offersToSort) => {
    let sortedOffers;

    switch (newSorting) {
      case SortingType.PRICE_ASCENDING:
        sortedOffers = sortOffersByPriceAscending(offersToSort);
        break;
      case SortingType.PRICE_DESCENDING:
        sortedOffers = sortOffersByPriceDescending(offersToSort);
        break;
      case SortingType.RATING:
        sortedOffers = sortOffersByRating(offersToSort);
        break;
      default:
        sortedOffers = offersToSort;
    }

    return {
      type: ActionType.CHANGE_SORTING,
      payload: { newSorting, sortedOffers},
    };
  },
};
