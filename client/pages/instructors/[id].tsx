
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { useState } from 'react';
import Instructor from '../../components/Instructor';
import Sidebar from '../../components/Drawer';
import styles from '../../styles/Home.module.css';
import Filter from '../../components/Filter';


export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/pros')
  const data = await res.json();

  const paths = data.map(resort => {
    return {
      params: {
        id: resort.resortId.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const resortId = context.params.id;
  const res = await fetch(`http://localhost:3000/api/pros/${resortId}`);
  const data = await res.json();

  return {

    props: { pro: data },

  }
}

const Instructors = ({ pro }) => {
  

  
  return (
    <Layout>
      <h2 className={styles.title}>These are all of the instructors that you selected</h2>
      <p className={styles.description}>Click on one to see their description</p>
      <Filter/>
      <Instructor pros={pro} />


    </Layout>

  )
};
export default Instructors;
