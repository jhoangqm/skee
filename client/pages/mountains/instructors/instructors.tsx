
import Layout from '../../../components/Layout';
import Instructor from '../../../components/Instructor';
import styles from '../../../styles/Home.module.css';
import Filter from '../../../components/Filter';
import useSWR from 'swr';
import { Pros, Resorts } from '@prisma/client';


const fetcher = (url: any) => fetch(url).then(res => res.json());

interface ResortProps {
  resorts: Resorts[];
}

interface ProProps {
  resorts: Pros[];
}


  


const Instructors = () => {

  // const { data, error } = useSWR<Resorts[]>('/api/resorts', fetcher);
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;


  // const getSelectedCategories = (


  const { data, error } = useSWR<Pros[]>('/api/pros/fullList', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const pro = data

  console.log("pro",pro)
  
  return (
    <Layout>
      <h2 className={styles.title}>These are all of the instructors that you selected</h2>
      <p className={styles.description}>Click on one to see their description</p>
      <p className={styles.description}> Your are currently looking at all instructors in Canada</p>
      
      <Instructor pros={pro} />


    </Layout>

  )
};
export default Instructors;
