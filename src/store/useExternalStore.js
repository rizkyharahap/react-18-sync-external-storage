import { useSyncExternalStore } from "react";
import store from "./store";

const useExternalStore = (selector = (state) => state) =>
  useSyncExternalStore(store.subscribe, () => selector(store.getState()));

export default useExternalStore;
