import {createStore, applyMiddleware} from 'redux';
import {createMigrate, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from './reducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {migrations} from './migrations';
import {middlewares} from '../middlewares';

const MIGRATION_MODE = false;

const persistConfig = {
  key: 'root',
  version: 2, // default: -1
  storage: AsyncStorage,
  debug: MIGRATION_MODE,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, {debug: MIGRATION_MODE}),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfig = () => {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};

export default storeConfig;
