import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineRatingWidth } from '../../utils/utils';
import { fetchOffer, fetchOffersNearBy, fetchReviews, toggleFavorites } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthorizationStatus, CardSetting, roomTypeAlias } from '../../const';
import OffersList from '../offers-list/offers-list';
import ReviewsList from '../review-list/review-list';
import Header from '../header/header';
import Map from '../map/map';
import ReviewForm from '../review-form/review-form';
import LoadingSpinner from '../loading-spinner/loading-spinner';

const MAX_IMAGES = 6;

function Room(props) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const [offer, setOfferInfo] = React.useState(null);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [offersNearBy, setOffersNearBy] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);

  const dispatch = useDispatch();

  const onFavoriteClick = () => {
    dispatch(toggleFavorites(offer.isFavorite, offer.id))
      .then((data) => setOfferInfo(Object.assign(
        {},
        offer,
        {'isFavorite': data.isFavorite},
      )))
      .catch(() => toast.error('Adding to favorites failed. Try again later.', {
        position: toast.POSITION.TOP_LEFT,
      }));
  };

  const updateReviews = () => dispatch(fetchReviews(props.match.params.id))
    .then((data) => {
      setReviews(data);
    });


  useEffect(() => {
    dispatch(fetchOffer(props.match.params.id))
      .then((data) => {
        setOfferInfo(data);
        setIsDataLoaded(true);
      });

    dispatch(fetchOffersNearBy(props.match.params.id))
      .then((data) => setOffersNearBy(data));

    dispatch(fetchReviews(props.match.params.id))
      .then((data) => {
        setReviews(data);
      });

    return () => {
      setOfferInfo(null);
      setIsDataLoaded(false);
      setOffersNearBy([]);
      setReviews([]);
    };

  }, [props.match.params.id, dispatch]);

  if (!isDataLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="page">
      <ToastContainer />
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images
                  .slice(0, MAX_IMAGES)
                  .map((imageUrl) => (
                    <div key={imageUrl} className="property__image-wrapper">
                      <img className="property__image" src={imageUrl} alt={offer.type} />
                    </div>
                  ))
              }
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
                <button
                  onClick={onFavoriteClick}
                  className={`property__bookmark-button button ${offer.isFavorite ? 'property__bookmark-button--active' : ''}`}
                  type="button"
                >
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
                  {
                    offer.goods.map((feature) => (
                      <li key={feature} className="property__inside-item">
                        {feature}
                      </li>
                    ))
                  }
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
                {reviews.length === 0 ?
                  '' : <ReviewsList reviews={reviews} />}
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <ReviewForm initReviewsUpdate={updateReviews} offerId={offer.id} /> : ''}
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
              {
                offersNearBy.length === 0 ? '' :
                  <OffersList
                    offers={offersNearBy}
                    setting={CardSetting.offerPage}
                  />
              }
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
};

export default Room;
