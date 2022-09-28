import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FC } from "react";
import storeWithTypescript, {
  ValueState,
} from "../../src/store/storeWithTypescript";
import styles from "../../styles/Home.module.css";

const IncrementValue: FC<{ item: keyof ValueState }> = ({ item }) => {
  const state = storeWithTypescript.getState();

  return (
    <button
      onClick={() => {
        storeWithTypescript.setState((prev) => ({
          ...prev,
          [item]: prev[item] + 1,
        }));
      }}
    >
      Increment {item}
    </button>
  );
};

const DisplayValue: FC<{ item: keyof ValueState }> = ({ item }) => {
  return (
    <div>
      {item}:{storeWithTypescript.useStore((state) => state[item])}
    </div>
  );
};

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        value1: 4,
        value2: 5,
      },
    },
  };
}

const IncrementReactExternalStorage: NextPage<{ initialState: ValueState }> = ({
  initialState,
}) => {
  const router = useRouter();
  storeWithTypescript.serverInitialize(initialState);

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
