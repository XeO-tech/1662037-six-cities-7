import { combineReducers } from 'redux';
import { appData } from './app-data/app-data';
import { user } from './user/user';

export const NameSpace = {
  APP_DATA: 'APP_DATA',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.APP_DATA]: appData,
  [NameSpace.USER]: user,
});
