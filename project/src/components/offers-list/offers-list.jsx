import React from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers, isFavoritePage} = props;

  return (
    <>
      {offers.map((offer) => <Card key={offer.id} offer={offer} isFavoritePage = {isFavoritePage}/>)}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
  isFavoritePage: PropTypes.bool.isRequired,
};

export default OffersList;
