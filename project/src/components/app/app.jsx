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

function App(props) {
  const {offersNumber, offers} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage
            offersNumber = {offersNumber}
            offers = {offers}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites offers = {offers}/>
        </Route>
        <Route exact path={AppRoute.ROOM} component={Room} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offersNumber: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(cardProp),
  // reviews: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     comment: PropTypes.string.isRequired,
  //     date: PropTypes.string.isRequired,
  //     id: 1,
  //     rating: 4,
  //     user: {
  //       avatarUrl: PropTypes.string.isRequired,
  //       id: 11,
  //       isPro: PropTypes.bool.isRequired,
  //       name: PropTypes.string.isRequired,
  //     },
  //   }),
  // ),
};

export default App;
