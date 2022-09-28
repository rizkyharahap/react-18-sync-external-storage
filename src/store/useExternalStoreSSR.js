import { useSyncExternalStore } from "react";
import store from "./store";

const useExternalStoreSSR = (selector = (state) => state) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    // Adding Get Server Snapshot
    () => selector(store.getState())
  );

export default useExternalStoreSSR;
