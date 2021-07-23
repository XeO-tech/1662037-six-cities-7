import React from 'react';
import { useDispatch } from 'react-redux';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defineRatingWidth } from '../../utils/utils';
import { toggleFavorites } from '../../store/api-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card(props) {
  const {offer, onListItemHover = () => {}, onListItemLeave = () => {}, setting} = props;
  const offerUrl = `/offer/${offer.id}`;

  const [favoriteStatus, setFavoriteStatus] = React.useState(offer.isFavorite);

  const dispatch = useDispatch();

  const onFavoriteClick = () => {
    dispatch(toggleFavorites(favoriteStatus, offer.id))
      .then((data) => setFavoriteStatus(data.isFavorite))
      .catch(() => toast.error('Adding to favorites failed. Try again later.', {
        position: toast.POSITION.TOP_LEFT,
      }));
  };

  return (
    <article
      onMouseEnter = {onListItemHover}
      onMouseLeave = {onListItemLeave}
      className={setting.ARTICLE_CLASS}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={setting.MAIN_DIV_CLASS}>
        <Link to={offerUrl}>
          <img className="place-card__image" src={offer.previewImage} width={setting.IMAGE_WIDTH} height={setting.IMAGE_HEIGHT} alt="Place pic" />
        </Link>
      </div>
      <div className={setting.INFO_DIV_CLASS}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={onFavoriteClick}
            className={`place-card__bookmark-button button ${favoriteStatus ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: defineRatingWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerUrl}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}

Card.propTypes = {
  offer: cardProp.offer.isRequired,
  onListItemHover: PropTypes.func,
  onListItemLeave: PropTypes.func,
  setting: cardProp.setting.isRequired,
};

export default Card;
