import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import { connect } from 'react-redux';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { isAuthUnknown } from '../../utils/utils';
import PrivateRoute from '../private-route/private-route';
import browserHisory from '../../browser-history';
import { init } from './init';


function App(props) {
  const {isDataLoaded, authorizationStatus, initApp} = props;

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (isAuthUnknown(authorizationStatus) || !isDataLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter history={browserHisory}>
      <Switch>
        <Route exact path={AppRoute.ROOT} component={MainPage} />
        <Route exact path={AppRoute.LOGIN} component={SignIn} />
        <PrivateRoute exact path={AppRoute.FAVORITES} render={() => <Favorites />} />
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
  initApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  initApp: () => dispatch(init()),
});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
