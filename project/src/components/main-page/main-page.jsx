import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list';
import { cardProp } from '../card/card.prop';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Map from '../map/map';
import { CardSetting } from '../../const';
import { cities } from '../../const';
import CitiesList from '../cities_list/cities-list';
import { connect } from 'react-redux';
import OffersSorting from '../offers-sorting/offers-sorting';

function MainPage(props) {
  const {filteredOffers, activeCity} = props;

  const [activeCardId, setActiveCardId] = useState(null);

  const onListItemHover = (offerID) => {
    setActiveCardId(offerID);
  };

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
        <OffersSorting />
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            offers={filteredOffers}
            setting={CardSetting.mainPage}
            onListItemHover = {onListItemHover}
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="foo">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
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
  filteredOffers: PropTypes.arrayOf(cardProp.offer),
  activeCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  filteredOffers: state.filteredOffers,
  activeCity: state.city,
});

export { MainPage };
export default connect(mapStateToProps, null)(MainPage);
