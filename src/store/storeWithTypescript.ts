import createStore from "./createStore";

const storeWithTypescript = createStore({
  value1: 0,
  value2: 0,
});

export type ValueState = ReturnType<typeof storeWithTypescript.getState>;

export default storeWithTypescript;
