import React from 'react';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defineRatingWidth } from '../../utils';

const Setting = {
  favoritesPage: {
    ARTICLE_CLASS: 'favorites__card place-card',
    MAIN_DIV_CLASS: 'favorites__image-wrapper place-card__image-wrapper',
    INFO_DIV_CLASS: 'favorites__card-info place-card__info',
    IMAGE_WIDTH: '150',
    IMAGE_HEIGHT: '110',
  },
  mainPage: {
    ARTICLE_CLASS: 'cities__place-card place-card',
    MAIN_DIV_CLASS: 'cities__image-wrapper place-card__image-wrapper',
    INFO_DIV_CLASS: 'place-card__info',
    IMAGE_WIDTH: '260',
    IMAGE_HEIGHT: '200',
  },
};

function Card(props) {
  const {offer, isFavoritePage, onListItemHover} = props;
  const setting = isFavoritePage ? Setting.favoritesPage : Setting.mainPage;

  return (
    <article
      onMouseEnter = {onListItemHover}
      className={setting.ARTICLE_CLASS}
    >
      <div className={setting.MAIN_DIV_CLASS}>
        <a href="foo">
          <img className="place-card__image" src={offer.previewImage} width={setting.IMAGE_WIDTH} height={setting.IMAGE_HEIGHT} alt="Place pic" />
        </a>
      </div>
      <div className={setting.INFO_DIV_CLASS}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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
          <Link to={`offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}

Card.propTypes = {
  offer: cardProp,
  isFavoritePage: PropTypes.bool.isRequired,
  onListItemHover: PropTypes.func,
};

export default Card;
