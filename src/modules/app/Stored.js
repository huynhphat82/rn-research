import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from '../../stores';

const Stored = ({children}) => {
  return (
    <Provider {...{store}}>
      <PersistGate loading={null} {...{persistor}}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Stored;
