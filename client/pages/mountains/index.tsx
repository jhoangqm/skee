import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';



function FrontOfCard({ resort }) {
  return (
    <div className="modal-mountains mx-15">
      <div key={resort.id} className="flex flex-wrap justify-center m-3  ">
        <div className="card w-96 bg-base-100 shadow-xl m-5 cursor-pointer">
          <figure>
            <img src={resort.image} alt="Album" object-fit="contain" />
          </figure>
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
                <button className="btn btn-primary w-3/4">
                  Book an instructor at {resort.name}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// hover:scale-110 transition duration-500
function BackOfCard({ resort }) {
  return (
    <div className="modal-mountains mx-15">
      <div key={resort.id} className="flex flex-wrap justify-center m-3">
        <div className="card w-96 bg-base-100 shadow-xl m-5 cursor-pointer">
          <figure>
            <img src={resort.image} alt="Album" object-fit="contain" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{resort.name}</h2>
            <p>
              <li>About the resort {resort.description}</li>
            </p>
            <div className="card-actions justify-center">
              <Link href={`/mountains/instructors/${resort.id}`}>
                <button className="btn btn-primary w-3/4">
                  Book an instructor at {resort.name}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



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
      <div className="mt-40">
        <blockquote className=" text-7xl font-semibold text-center text-slate-900 mt-10 mb-10">
          Your are looking at all the mountains in&nbsp;
          <span className=" before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-info relative inline-block">
            <span className="relative text-white">
              &nbsp;Canada&nbsp;
            </span>
          </span>
        </blockquote>
      </div>



      <div className=" flex flex-wrap justify-around">
        {resorts.map((resort) => (
          <div className="flip flex flex-wrap justify-center m-3">
            <div className="flip-content">
              <div className="flip-front">
                <FrontOfCard resort={resort} />
              </div>
              <div className="flip-back">
                <BackOfCard resort={resort} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Mountains;
