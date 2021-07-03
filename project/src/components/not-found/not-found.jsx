import React from 'react';
import Header from '../header/header';

function NotFound() {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <div className="page__favorites-container container">
          <h1>404. Page not found</h1>
          <a href="/">Вернуться на главную</a>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
