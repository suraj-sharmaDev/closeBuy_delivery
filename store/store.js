import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1 // see "Merge Process" section for details.
}
 
const rootReducer = combineReducers({
  user : persistReducer(userPersistConfig,userReducer),
  order : orderReducer
});

export const configureStore = createStore(rootReducer);
export const persistor = persistStore(configureStore);


// const rootReducer = combineReducers({
//   user : userReducer,
//   order : orderReducer
// });

// export const configureStore = createStore(rootReducer);
