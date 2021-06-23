import React from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers, setting, onListItemHover} = props;

  return (
    <>
      {offers.map((offer) => (
        <Card
          onListItemHover = {() => onListItemHover(offer.id)}
          setting={setting}
          key={offer.id}
          offer={offer}
        />))}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
  onListItemHover: PropTypes.func,
  setting: PropTypes.shape({
    ARTICLE_CLASS: PropTypes.string.isRequired,
    MAIN_DIV_CLASS: PropTypes.string.isRequired,
    INFO_DIV_CLASS: PropTypes.string.isRequired,
    IMAGE_WIDTH: PropTypes.number.isRequired,
    IMAGE_HEIGHT: PropTypes.number.isRequired,
  }),
};

export default OffersList;
