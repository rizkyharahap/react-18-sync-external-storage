import type { NextPage } from "next";
import type { FC } from "react";
import store from "../../src/store/store";
import styles from "../../styles/Home.module.css";
import useExternalStore from "../../src/store/useExternalStore";
import { useRouter } from "next/router";
import { ValueState } from "../../src/store/storeWithTypescript";

const IncrementValue: FC<{ item: keyof ValueState }> = ({ item }) => {
  return (
    <button
      onClick={() => {
        const state = store.getState();
        store.setState({
          ...state,
          [item]: state[item] + 1,
        });
      }}
    >
      Increment {item}
    </button>
  );
};

const DisplayValue: FC<{ item: keyof ValueState }> = ({ item }) => {
  return (
    <div>
      {item}: {useExternalStore((state) => state[item])}
    </div>
  );
};

const IncrementReactExternalStorage: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button onClick={router.back}>Back</button>
      <IncrementValue item="value1" />
      <DisplayValue item="value1" />
      <IncrementValue item="value2" />
      <DisplayValue item="value2" />
    </div>
  );
};

export default IncrementReactExternalStorage;
