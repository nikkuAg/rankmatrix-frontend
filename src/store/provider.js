'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '.';

const StoreProvider = ({ children }) => {
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
