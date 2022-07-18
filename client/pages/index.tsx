import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import Sockets from '../components/sockets'
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import Map from '../components/Map';
import Carousel from '../components/Carousel';

// NEXT MAIN PAGE
const Home: NextPage = ({ resort }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Skee</title>
          <meta name="description" content="Nexjs app" />
          <link rel="icon" href="/public/icons8-ski-96.png" />
        </Head>
        <main className={styles.main}>
          <blockquote className=" text-7xl font-semibold text-center text-slate-900">
            Find your next
            <span className=" before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-info relative inline-block">
              <span className="relative text-white">
                &nbsp;ski instructor&nbsp;
              </span>
            </span>
            here!
          </blockquote>
          <p className={styles.description}>
            Click on the map below to direct you to your favorite mountain:
          </p>
          <Map resort={resort} />
          {/* <p className={styles.description}>
            Search resorts in your area below:
          </p> */}
          {/* <Carousel /> */}
        </main>
      </div>
    </Layout>
  );
};

export default Home;
