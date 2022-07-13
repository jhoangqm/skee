import Layout from '../../components/Layout';
import Instructor from '../../components/Instructor';

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

//? Finding resort specifi information

  const res2 = await fetch(`http://localhost:3000/api/resorts/${resortId}`);
  const data2 = await res2.json();
  

  return {

    props: { pro: data, resort: data2 },

  }
}

const Instructors = ({ pro, resort }) => {
  

  
  return (
    <Layout>
      <h2 className={styles.title}>These are all of the instructors that you selected</h2>
      <p className={styles.description}>Click on one to see their description</p>
      <p className={styles.description}> Your are currently looking at instructors based out of {resort[0].name}</p>
      <Filter/>
      <Instructor pros={pro} resorts={resort}/>


    </Layout>

  )
};
export default Instructors;
