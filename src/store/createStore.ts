import { useSyncExternalStore } from "react";

/**
 * Function for create new store, support for server side.
 * @param initialState Generic State Type
 * @returns `subscribe`, `getState`, `setState`, `serverInitialize`, `getServerState`, `useStore`
 */

export default function createStore<StateType>(initialState: StateType) {
  let currentState = initialState;
  let serverState: StateType | null = null;

  const listeners = new Set<(state: StateType) => void>();

  // subscribe and unsubscribe listener
  const subscribe = (listener: (state: StateType) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    subscribe,
    getState: () => currentState,
    setState: (callback: (state: StateType) => StateType) => {
      currentState = callback(currentState);
      listeners.forEach((listener) => listener(currentState));
    },
    serverInitialize: (newState: StateType) => {
      if (!serverState) {
        currentState = newState;
        serverState = newState;
      }
    },
    getServerState: () => serverState ?? currentState,
    useStore: <SelectorType>(
      selector: (state: StateType) => SelectorType
    ): SelectorType =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        // Adding Get Server Snapshot
        () => selector(serverState ?? currentState)
      ),
  };
}
