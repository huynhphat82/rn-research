import {createStore, applyMiddleware} from 'redux';
import {createMigrate, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {middlewares} from '@app/middlewares';
import {migrations} from '@app/stores/migrations';
import {rootReducer} from '@app/stores/reducer';

const MIGRATION_MODE = true;

const persistConfig = {
  key: 'root',
  version: 1, // default: -1
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
