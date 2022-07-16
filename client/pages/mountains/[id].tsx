import Layout from '../../components/Layout';
import Link from 'next/link';
import Calendar from '../../components/Calendar';

export const getStaticPaths = async () => {
  const res = await fetch('/api/resorts');
  const data = await res.json();

  const paths = data.map(resort => {
    return {
      params: {
        id: resort.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async context => {
  const resortId = context.params.id;
  const res = await fetch(`/api/resorts/${resortId}`);
  const data = await res.json();

  return {
    props: { resort: data },
  };
};

const Mountains = ({ resort }) => {
  return (
    <Layout signup={undefined}>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={resort[0].image}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{resort[0].name}</h1>
            <div className="py-6">
              <li>Vertical Meters {resort[0].vert}</li>
              <li>Skiable Terrain {resort[0].skiableTerrain}</li>
              <li>Number of Runs {resort[0].runs}</li>
              <li>Number of lifts {resort[0].lifts}</li>
              <li>Green runs {resort[0].easyRuns}</li>
              <li>Blue Runs {resort[0].mediumRuns}</li>
              <li>Black/Double Black Runs {resort[0].hardRuns}</li>
            </div>
            <Link href={`/instructors/${resort[0].id}`}>
              <a className="btn btn-primary">
                Book an instructor at {resort[0].name}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mountains;
