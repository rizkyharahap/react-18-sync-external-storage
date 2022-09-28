import type { NextPage } from "next";
import type { FC } from "react";
import store from "../../src/store/store";
import styles from "../../styles/Home.module.css";
import useExternalStoreSSR from "../../src/store/useExternalStoreSSR";
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
      {item}: {useExternalStoreSSR((state) => state[item])}
    </div>
  );
};

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        value1: 12,
        value2: 14,
      },
    },
  };
}

const IncrementReactExternalStorage: NextPage<{ initialState: ValueState }> = ({
  initialState,
}) => {
  store.serverInitialize(initialState);

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
