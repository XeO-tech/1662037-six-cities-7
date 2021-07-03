import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list';
import { cardProp } from '../card/card.prop';
import Map from '../map/map';
import { CardSetting } from '../../const';
import { cities } from '../../const';
import CitiesList from '../cities-list/cities-list';
import { connect } from 'react-redux';
import OffersSorting from '../offers-sorting/offers-sorting';
import { getFilteredOffers } from '../../utils/utils';
import { sortOffers } from '../../utils/utils';
import { SortingType } from '../../const';

import Header from '../header/header';

function MainPage(props) {
  const {filteredOffers, activeCity} = props;

  const [activeCardId, setActiveCardId] = useState(null);
  const [activeSorting, setActiveSorting] = useState(SortingType.POPULAR);

  const sortedOffers = sortOffers(activeSorting, filteredOffers);

  const onListItemHover = (offerID) => {
    setActiveCardId(offerID);
  };

  const onListItemOut = (offerID) => {
    setActiveCardId(null);
  };

  const onSortingChange = (newSortingType) => setActiveSorting(newSortingType);


  const emptyPage = (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
        </div>
      </section>
      <div className="cities__right-section" />
    </div>
  );

  const pageWithCards = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
        <OffersSorting offers={filteredOffers} activeSorting={activeSorting} onSortingChange={onSortingChange}/>
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            offers={sortedOffers}
            setting={CardSetting.mainPage}
            onListItemHover = {onListItemHover}
            onListItemOut = {onListItemOut}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"><Map offers={filteredOffers} activeCardId={activeCardId} /></section>
      </div>
    </div>
  );

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={cities} />
        </div>
        <div className="cities">
          {filteredOffers.length === 0 ? emptyPage : pageWithCards}
        </div>
      </main>
    </div>
  );
}

MainPage.propTypes = {
  filteredOffers: PropTypes.arrayOf(cardProp.offer).isRequired,
  activeCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  filteredOffers: getFilteredOffers(state.offers, state.city),
  activeCity: state.city,
});

export { MainPage };
export default connect(mapStateToProps)(MainPage);
