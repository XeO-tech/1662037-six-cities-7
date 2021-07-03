import React from 'react';
import CommentForm from '../comment-form/comment-form';
import NotFound from '../not-found/not-found';
import { defineRatingWidth } from '../../utils/utils';
import PropTypes from 'prop-types';
import { cardProp } from '../card/card.prop';
import ReviewsList from '../review-list/review-list';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import { roomTypeAlias } from '../../const';
import { CardSetting } from '../../const';
import { connect } from 'react-redux';
import Header from '../header/header';

function Room(props) {
  const {offers} = props;
  const reviews = [];

  const offer = offers.find((offerItem) => offerItem.id === Number(props.match.params.id));

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
      <Header />
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
            <Map offers={offersNearBy} activeCardId={offer.id} currentCard={offer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={offersNearBy}
                setting={CardSetting.offerPage}
                onListItemHover={() => {}}
                onListItemOut={() => {}}
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
  offers: PropTypes.arrayOf(cardProp.offer).isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,

});

export { Room };
export default connect(mapStateToProps, null)(Room);
