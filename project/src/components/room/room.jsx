import React, { useState } from 'react';
import CommentForm from '../comment-form/comment-form';
import NotFound from '../not-found/not-found';
import { defineRatingWidth } from '../utils/utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { cardProp } from '../card/card.prop';
import { reviewProp } from '../review/review.prop';
import ReviewsList from '../review-list/review-list';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import { roomTypeAlias } from '../../const';
import { CardSetting } from '../../const';


function Room(props) {
  const {offers, reviews} = props;

  const [activeCardId, setActiveCardId] = useState(null);

  const onListItemHover = (offerID) => {
    setActiveCardId(offerID);
  };

  const offer = offers.filter((offerItem) => offerItem.id === Number(props.match.params.id))[0];

  if (!offer) {
    return <NotFound />;
  }

  const offersNearBy = offers.slice(offers.length - 4, offers.length-1);

  const offerReviews = reviews
    .filter((review) => review.id === Number(props.match.params.id))
    .slice(0,9)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.ROOT} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="foo">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images
                .slice(0,4)
                .map((imageUrl) => (
                  <div key={imageUrl} className="property__image-wrapper">
                    <img className="property__image" src={imageUrl} alt={offer.type} />
                  </div>
                ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: defineRatingWidth(offer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {roomTypeAlias[offer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((feature) => (
                    <li key={feature} className="property__inside-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {
                    offer.host.isPro &&
                    <span className="property__user-status">
                    Pro
                    </span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={offerReviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={offersNearBy} activeCardId={activeCardId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={offersNearBy}
                setting={CardSetting.offerPage}
                onListItemHover={onListItemHover}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  offers: PropTypes.arrayOf(cardProp.offer),
  reviews: PropTypes.arrayOf(reviewProp),
};

export default Room;
