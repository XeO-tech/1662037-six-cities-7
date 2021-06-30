import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import { connect } from 'react-redux';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { isAuthUnknown } from '../../utils/utils';

function App(props) {
  const {isDataLoaded, authorizationStatus} = props;

  if (isAuthUnknown(authorizationStatus) || !isDataLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT} component={MainPage} />
        <Route exact path={AppRoute.LOGIN} component={SignIn} />
        <Route exact path={AppRoute.FAVORITES} component={Favorites} />
        <Route exact path={AppRoute.ROOM} render={(properties) => <Room {...properties} /> } />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

export { App };
export default connect(mapStateToProps, null)(App);
