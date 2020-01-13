import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import addressReducer from './reducers/addressReducer';

const rootReducer = combineReducers({
  user : userReducer,
  address : addressReducer
});

const configureStore = createStore(rootReducer);

export default configureStore;