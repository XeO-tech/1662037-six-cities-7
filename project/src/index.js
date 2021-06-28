import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { createStore, applyMiddleware } from 'redux';
import { createAPI } from './services/api';
import thunk from 'redux-thunk';
import { fetchOffersList } from './services/api-actions';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const api = createAPI();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
