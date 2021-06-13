import React from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers} = props;

  return (
    <>
      {offers.map((offer) => <Card key={offer.id} offer={offer} />)}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
};

export default OffersList;
