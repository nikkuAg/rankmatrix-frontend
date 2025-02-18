"use client";

import { Provider } from "react-redux";

import store from ".";

/**
 * A React context provider for Redux store.
 * This component is used to wrap the root of the app, and should be used in `app/layout.js`.
 * It will pass the Redux store to all components that use the `useStore` hook.
 *
 * @param {React.ReactNode} children - The children component(s) to render.
 */
const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
