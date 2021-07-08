import React, { useState } from 'react';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { CardSetting } from '../../const';
import CitiesList from '../cities-list/cities-list';
import { useSelector } from 'react-redux';
import OffersSorting from '../offers-sorting/offers-sorting';
import { sortOffers } from '../../utils/utils';
import { SortingType } from '../../const';
import { selectOffersByCity } from './selectors';
import { getOffers } from '../../store/app-data/selectors';
import { getCity } from '../../store/app-data/selectors';
import EmptyPage from './empty-main-page';
import { ToastContainer } from 'react-toastify';

import Header from '../header/header';

function MainPage() {
  const offers = useSelector(getOffers);
  const activeCity = useSelector(getCity);

  const filteredOffers = selectOffersByCity(offers, activeCity);

  const [activeCardId, setActiveCardId] = useState(null);
  const [activeSorting, setActiveSorting] = useState(SortingType.POPULAR);

  const sortedOffers = sortOffers(activeSorting, filteredOffers);

  const onSortingChange = (newSortingType) => setActiveSorting(newSortingType);

  const onListItemHover = (offerID) => setActiveCardId(offerID);

  const onListItemLeave = () => setActiveCardId(null);


  const pageWithCards = (
    <div className="cities__places-container container">
      <ToastContainer />
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
        <OffersSorting offers={filteredOffers} activeSorting={activeSorting} onSortingChange={onSortingChange}/>
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            offers={sortedOffers}
            setting={CardSetting.mainPage}
            onListItemHover = {onListItemHover}
            onListItemLeave = {onListItemLeave}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={filteredOffers} activeCardId={activeCardId} />
        </section>
      </div>
    </div>
  );

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          {filteredOffers.length === 0 ? <EmptyPage /> : pageWithCards}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
