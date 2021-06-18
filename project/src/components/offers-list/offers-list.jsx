import React, { useState } from 'react';
import Card from '../card/card';
import { cardProp } from '../card/card.prop';
import PropTypes from 'prop-types';


function OffersList(props) {
  const {offers, isFavoritePage} = props;

  /* eslint-disable no-unused-vars */
  const [activeCard, setActiveCard] = useState(null);
  /* eslint-enable no-unused-vars */

  return (
    <>
      {offers.map((offer) => (
        <Card
          mouseEnterHandler = {() => setActiveCard(offer.id)}
          mouseLeaveHandler = {() => setActiveCard(null)}

          key={offer.id}
          offer={offer}
          isFavoritePage = {isFavoritePage}
        />))}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
  isFavoritePage: PropTypes.bool.isRequired,
};

export default OffersList;
