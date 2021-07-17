import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';
import { Router as BrowserRouter } from 'react-router-dom';
import browserHisory from './browser-history';


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
      <BrowserRouter history={browserHisory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
