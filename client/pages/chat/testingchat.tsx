import type { NextPage } from 'next'
import Sockets from '../../components/Sockets'
import Uploads from '../../components/Uploads'
import styles from '../../styles/Home.module.css'


const TestingChat: NextPage = () => {
  return (
    <div className={styles.container}>
      <Sockets/>
      <Uploads/>
    </div>
  )
}

export default TestingChat
