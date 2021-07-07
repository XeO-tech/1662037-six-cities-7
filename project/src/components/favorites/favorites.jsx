import React from 'react';
import OffersList from '../offers-list/offers-list';
import { AppRoute, CardSetting } from '../../const';
import { useSelector } from 'react-redux';
import Header from '../header/header';
import { getOffers } from '../../store/app-data/selectors';
import { Link } from 'react-router-dom';

function Favorites() {
  const offers = useSelector(getOffers);

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
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? emptyPage : pageWithCards}
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.ROOT} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
