import { useEffect, useState } from "react";
import store from "./store";

const useStore = (selector = (state) => state) => {
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => store.subscribe((state) => setState(selector(state))), []);

  return state;
};

export default useStore;
