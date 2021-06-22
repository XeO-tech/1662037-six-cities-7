import React from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers, isFavoritePage, onListItemHover} = props;

  return (
    <>
      {offers.map((offer) => (
        <Card
          onListItemHover = {() => onListItemHover(offer.id)}

          key={offer.id}
          offer={offer}
          isFavoritePage = {isFavoritePage}
        />))}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
  onListItemHover: PropTypes.func,
  isFavoritePage: PropTypes.bool.isRequired,
};

export default OffersList;
