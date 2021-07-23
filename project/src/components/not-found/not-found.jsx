import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';

function NotFound() {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <div className="page__favorites-container container">
          <h1>404. Page not found</h1>
          <Link to={AppRoute.ROOT}>Вернуться на главную</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
