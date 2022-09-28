import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href="/increment-custom-hook">
        <a>Increment Custom Hook</a>
      </Link>
      <Link href="/increment-react-external-storage">
        <a>Increment React External Storage</a>
      </Link>
      <Link href="/increment-react-external-storage-ssr">
        <a>Increment React External Storage SSR </a>
      </Link>
      <Link href="/increment-react-external-storage-ssr-typescript">
        <a>Increment React External Storage SSR Typescript</a>
      </Link>
    </div>
  );
};

export default Home;
