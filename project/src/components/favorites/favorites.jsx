import React from 'react';
import PropTypes from 'prop-types';
import { cardProp } from '../card/card.prop';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import OffersList from '../offers-list/offers-list';
import { CardSetting } from '../../const';
import { connect } from 'react-redux';

function Favorites(props) {
  const {offers} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const uniqueLocations = [...(new Set(favoriteOffers.map((offer) => offer.city.name)))];

  const emptyPage = (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
      </div>
    </section>
  );

  const pageWithCards = (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {uniqueLocations.map((location, i) => (
          <li key={location} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="foo">
                  <span>{location}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <OffersList
                offers={favoriteOffers.filter((offer) => offer.city.name === location)}
                setting={CardSetting.favoritesPage}
                onListItemHover={() => {}}
                onListItemOut={() => {}}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.ROOT} className="header__logo-link">
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? emptyPage : pageWithCards}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

Favorites.propTypes = {
  offers: PropTypes.arrayOf(cardProp.offer),
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export { Favorites };
export default connect(mapStateToProps, null)(Favorites);
