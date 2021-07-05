import React from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers, setting, onListItemHover = () => {}, onListItemLeave = () => {}} = props;

  return (
    <>
      {offers.map((offer) => (
        <Card
          onListItemHover = {() => onListItemHover(offer.id)}
          onListItemLeave = {() => onListItemLeave(offer.id)}
          setting={setting}
          key={offer.id}
          offer={offer}
        />))}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp.offer).isRequired,
  onListItemHover: PropTypes.func,
  onListItemLeave: PropTypes.func,
  setting: cardProp.setting.isRequired,
};

export default OffersList;
