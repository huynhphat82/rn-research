import {createStore, applyMiddleware, compose} from 'redux';
import {createMigrate, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {middlewares} from '@app/middlewares';
import {migrations} from '@app/stores/migrations';
import {rootReducer} from '@app/stores/reducer';
import {batchedSubscribe} from 'redux-batched-subscribe';
import {debounce} from 'lodash';

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

const storeConfig = (preloadedState) => {
  let enhancers = compose(
    applyMiddleware(...middlewares),
    batchedSubscribe(debounce((notify) => notify())), // debounce subscriber calls for multiple dispatches
  );
  let store = createStore(persistedReducer, preloadedState, enhancers);
  let persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};

export default storeConfig;
