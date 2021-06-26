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

export const adaptOfferToServer = (offer) => {
  const clonedOffer = cloneDeep(offer);

  const adaptedOffer = Object.assign(
    clonedOffer,
    {
      host: {
        'avatar_url': clonedOffer.host.avatarUrl,
        'is_pro': clonedOffer.host.isPro,
        id: clonedOffer.host.id,
        name: clonedOffer.host.name,
      },
      'is_favorite': clonedOffer.isFavorite,
      'is_premium': clonedOffer.isPremium,
      'max_adults': clonedOffer.maxAdults,
      'preview_image': clonedOffer.previewImage,
    });

  delete adaptedOffer.host.avatarUrl;
  delete adaptedOffer.host.isPro;
  delete adaptedOffer.isFavorite;
  delete adaptedOffer.isPremium;
  delete adaptedOffer.maxAdults;
  delete adaptedOffer.previewImage;

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

export const adaptReviewToServer = (review) => {
  const clonedReview = cloneDeep(review);

  const adaptedReview = Object.assign(
    clonedReview,
    {
      user: {
        'avatar_url': clonedReview.user.avatarUrl,
        'is_pro': clonedReview.user.isPro,
        id: clonedReview.user.id,
        name: clonedReview.user.name,
      },
    });

  delete adaptedReview.user.avatarUrl;
  delete adaptedReview.user.isPro;

  return adaptedReview;
};

