import type { NextPage } from 'next';
import Sockets from '../../components/Sockets';
import Uploads from '../../components/Uploads';
import styles from '../../styles/Home.module.css';
import Layout from '../../lib/layout/Layout';

const TestingChat: NextPage = () => {
  return (
    <Layout>
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        <Sockets />
        <Uploads />
      </div>
    </Layout>
  );
};

export default TestingChat;
