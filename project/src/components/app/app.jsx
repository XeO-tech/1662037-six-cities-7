import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { isAuthUnknown } from '../../utils/utils';
import PrivateRoute from '../private-route/private-route';
import { init } from './actions/init';
import { getLoadedDataStatus } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';


function App() {

  const isDataLoaded = useSelector(getLoadedDataStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  if (isAuthUnknown(authorizationStatus) || !isDataLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT} component={MainPage} />
      <Route exact path={AppRoute.LOGIN} component={SignIn} />
      <PrivateRoute exact path={AppRoute.FAVORITES} render={() => <Favorites />} />
      <Route exact path={AppRoute.ROOM} render={(properties) => <Room {...properties} /> } />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;

