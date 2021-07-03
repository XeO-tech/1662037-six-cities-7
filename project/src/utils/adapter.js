import cloneDeep from 'lodash/cloneDeep';

export const adaptOfferToClient = (offer) => {
  if (offer === undefined) {
    return;
  }

  const clonedOffer = cloneDeep(offer);

  const adaptedOffer = Object.assign(
    clonedOffer,
    {
      host: {
        avatarUrl: clonedOffer.host['avatar_url'],
        isPro: clonedOffer.host['is_pro'],
        id: clonedOffer.host.id,
        name: clonedOffer.host.name,
      },
      isFavorite: clonedOffer['is_favorite'],
      isPremium: clonedOffer['is_premium'],
      maxAdults: clonedOffer['max_adults'],
      previewImage: clonedOffer['preview_image'],
    });

  delete adaptedOffer.host['avatar_url'];
  delete adaptedOffer.host['is_pro'];
  delete adaptedOffer['is_favorite'];
  delete adaptedOffer['is_premium'];
  delete adaptedOffer['max_adults'];
  delete adaptedOffer['preview_image'];

  return adaptedOffer;
};

export const adaptReviewToClient = (review) => {
  const clonedReview = cloneDeep(review);

  const adaptedReview = Object.assign(
    clonedReview,
    {
      user: {
        avatarUrl: clonedReview.user['avatar_url'],
        isPro: clonedReview.user['is_pro'],
        id: clonedReview.user.id,
        name: clonedReview.user.name,
      },
    });

  delete adaptedReview.user['avatar_url'];
  delete adaptedReview.user['is_pro'];

  return adaptedReview;
};

