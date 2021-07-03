import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { createStore, applyMiddleware } from 'redux';
import { createAPI } from './services/api';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionCreator } from './store/action';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
