import React from 'react';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defineRatingWidth } from '../../utils';

function Card(props) {
  const {offer, onListItemHover, setting} = props;

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
  onListItemHover: PropTypes.func,
  setting: PropTypes.shape({
    ARTICLE_CLASS: PropTypes.string.isRequired,
    MAIN_DIV_CLASS: PropTypes.string.isRequired,
    INFO_DIV_CLASS: PropTypes.string.isRequired,
    IMAGE_WIDTH: PropTypes.number.isRequired,
    IMAGE_HEIGHT: PropTypes.number.isRequired,
  }),
};

export default Card;
