import Layout from '../../components/Layout';
import Link from 'next/link';

import Calendar from '../../components/Calendar';
import styles from "../../styles/Home.module.css";


export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/resorts/');
  const data = await res.json();

  const paths = data.map(resort => {
    return {
      params: {
        id: resort.province.toString(),
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async context => {
  console.log("CONTEXT",context)
  const resortId = context.params.id;
  const res = await fetch(`http://localhost:3000/api/resorts/${resortId}`);
  const data = await res.json();

  return {
    props: { resort: data },
  };
};

const Mountains = ({ resort }) => {
  return (
    <Layout>
    <h1 className={styles.title}>Your are looking at all the mountains in {resort[0].province}</h1>
    <p className={styles.description}>
          Click on the resort you wish to ski at:
        </p>
    <div className="modal-mountains">
      
    {resort.map(resort => (
      <div key={resort.id} className="flex flex-wrap justify-center  m-5">
        <div className="card card-side w-100 bg-base-100 shadow-xl">
          <figure ><img className='object-contain h-20 w-20' src={resort.image} alt="Album" /></figure>
          <div className="card-body">
            <h2 className="card-title">{resort.name}</h2>
            <p>
              <li>Vertical Meters {resort.vert}</li>
              <li>Skiable Terrain {resort.skiableTerrain}</li>
              <li>Number of Runs {resort.runs}</li>
              <li>Number of lifts {resort.lifts}</li>
              <li>Green runs {resort.easyRuns}</li>
              <li>Blue Runs {resort.mediumRuns}</li>
              <li>Black/Double Black Runs {resort.hardRuns}</li>
            </p>
            <div className="card-actions justify-center">
              <Link href={`/mountains/instructors/${resort.id}`}>
                <button className="btn btn-primary">Book an instructor at {resort.name}</button>
              </Link>   
         </div>
            </div>
          </div></div>
    ))}</div>
      </Layout>
  );
};

export default Mountains;
