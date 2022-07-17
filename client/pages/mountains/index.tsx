import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "../../styles/Home.module.css";

const Mountains = () => {
  const [resorts, setResorts] = useState([]);
  const fetchResorts = () => {
    fetch('/api/resorts', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setResorts(data));
  };
  useEffect(() => fetchResorts(), []);
  console.log(resorts);

  return (
    <Layout>
      <h1 className={styles.title}>You are looking at all the mountains in Canada</h1>
      <p className={styles.description}>
            Click on the resort you wish to ski at:
          </p>
      <div className="modal-mountains">
        
      {resorts.map(resort => (
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
