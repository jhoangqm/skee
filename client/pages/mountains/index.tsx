import Layout from '../../lib/layout/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function FrontOfCard({ resort }) {
  return (
    <div className="modal-mountains ">
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
                <button className="btn btn-primary w-3/4 mt-5">
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

function BackOfCard({ resort }) {
  return (
    <div className="modal-mountains ">
      <div key={resort.id} className="flex flex-wrap justify-center m-3">
        <div className="card w-96 bg-base-100 shadow-xl m-5 cursor-pointer">
          <figure>
            <img src={resort.image} alt="Album" object-fit="contain" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{resort.name}</h2>
            <p>About the resort {resort.description}</p>
            <div className="card-actions justify-center">
              <Link href={`/mountains/instructors/${resort.id}`}>
                <button className="btn btn-primary w-3/4 mt-5">
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

  return (
    <Layout>
      <div className="mt-40">
        <blockquote className=" text-7xl font-semibold text-center text-slate-900 mt-10 mb-10">
          Your are looking at all the mountains in&nbsp;
          <span className=" before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-info relative inline-block">
            <span className="relative text-white">&nbsp;Canada&nbsp;</span>
          </span>
        </blockquote>
      </div>

      <div className=" flex flex-wrap justify-center">
        {resorts.map(resort => (
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <FrontOfCard resort={resort} />
              </div>
              <div className="flip-card-back">
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
