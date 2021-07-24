import React from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/root-reducer';
import { requireAuthorization } from './store/action';
import { createAPI } from './services/api';
import { redirect } from './store/middlewares/redirect';
import browserHistory from './browser-history';
import { AuthorizationStatus } from './const';
import App from './components/app/app';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
