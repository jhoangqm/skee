
import Layout from '../../../components/Layout';
import Instructor from '../../../components/Instructor';

import styles from '../../../styles';
import Filter from '../../../components/Filter';
import path from 'path';
import { data } from 'cypress/types/jquery';


export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/pros')
  const data = await res.json();
 console.log("DATA", data);
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
  console.log("MR", context.params)
  const resortId = context.params.id;
  const res = await fetch(`http://localhost:3000/api/pros/resortfinder/${resortId}`);
  const data = await res.json();

//? Finding resort specifi information

  // const res2 = await fetch(`http://localhost:3000/api/resorts/${resortId}`);
  // const data2 = await res2.json();
  

  return {

    props: { pros: data },

  }
}

const Instructors = ({ pros }) => {
console.log("MR DATA", pros)
  
  return (
    <Layout>
      {/* <h2 className={styles.title}>These are all of the instructors that you selected</h2>
      <p className={styles.description}>Click on one to see their description</p> */}
      <p > Your are currently looking at instructors based out of {pros.resorts}</p> 
      {/* <Filter/> */}
      <Instructor pros={pros} />


    </Layout>

  )
};
export default Instructors;