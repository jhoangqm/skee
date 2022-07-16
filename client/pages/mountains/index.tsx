import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      <h1>Mountains</h1>
      <div className="flex flex-wrap">
        {resorts.map(resort => (
          <div className="hero min-h-1/2 bg-base-200 w-1/2 ">
            <div className="hero-content flex-col lg:flex-row border-5 border-solid border-black  opacity-100">
              <img
                src={resort.image}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-5xl font-bold">{resort.name}</h1>
                <div className="py-6">
                  <li>Vertical Meters {resort.vert}</li>
                  <li>Skiable Terrain {resort.skiableTerrain}</li>
                  <li>Number of Runs {resort.runs}</li>
                  <li>Number of lifts {resort.lifts}</li>
                  <li>Green runs {resort.easyRuns}</li>
                  <li>Blue Runs {resort.mediumRuns}</li>
                  <li>Black/Double Black Runs {resort.hardRuns}</li>
                </div>
                <Link href={`/instructors/${resort.id}`}>
                  <a className="btn btn-primary">
                    Book an instructor at {resort.name}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Mountains;
