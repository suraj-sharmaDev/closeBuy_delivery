import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';

const rootReducer = combineReducers({
  user : userReducer,
  order : orderReducer
});

const configureStore = createStore(rootReducer);

export default configureStore;