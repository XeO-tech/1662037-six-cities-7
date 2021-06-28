import React from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers, setting, onListItemHover, onListItemOut} = props;

  return (
    <>
      {offers.map((offer) => (
        <Card
          onListItemHover = {() => onListItemHover(offer.id)}
          onListItemOut = {() => onListItemOut(offer.id)}
          setting={setting}
          key={offer.id}
          offer={offer}
        />))}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp.offer),
  onListItemHover: PropTypes.func,
  onListItemOut: PropTypes.func,
  setting: PropTypes.shape(cardProp.setting),
};

export default OffersList;
