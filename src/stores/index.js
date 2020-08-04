import storeConfig from './store';

const {store, persistor} = storeConfig();

export {
  store,
  persistor,
};
