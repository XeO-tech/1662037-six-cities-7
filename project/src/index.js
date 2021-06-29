import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { createStore, applyMiddleware } from 'redux';
import { createAPI } from './services/api';
import thunk from 'redux-thunk';
import { fetchOffersList, checkAuth } from './store/api-actions';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionCreator } from './store/action';
import { AuthorizationStatus } from './const';

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(fetchOffersList());
store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
