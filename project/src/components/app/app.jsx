import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import { cardProp } from '../card/card.prop';
import { reviewProp } from '../review/review.prop';
import { connect } from 'react-redux';

function App(props) {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites />
        </Route>
        <Route exact path={AppRoute.ROOM} render={(properties) => <Room {...properties} /> } />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: PropTypes.arrayOf(cardProp.offer).isRequired,
  reviews: PropTypes.arrayOf(reviewProp),
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  reviews: state.reviews,
});

export { App };
export default connect(mapStateToProps, null)(App);
