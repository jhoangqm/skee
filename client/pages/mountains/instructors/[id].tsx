import Layout from "../../../components/Layout";
import Instructor from "../../../components/Instructor";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/pros");
  const data = await res.json();
  const paths = data.map((resort) => {
    return {
      params: {
        id: resort.resortId.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const resortId = context.params.id;
  const res = await fetch(
    `http://localhost:3000/api/pros/resortfinder/${resortId}`
  );
  const data = await res.json();

  return {
    props: { pros: data },
  };
};

const Instructors = ({ pros }) => {
  return (
    <Layout>
      <p></p>

      <div className="mt-40">
        <h2 className="text-7xl font-semibold text-center text-slate-900">
          These are all of the instructors that you selected
        </h2>
        <blockquote className=" text-3xl  text-center text-slate-900 mt-10 mb-10">
          You are currently looking at instructors based out of &nbsp;
          <span className=" before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-info relative inline-block">
            <span className="relative text-white">
              &nbsp;{pros[0].resorts.name}&nbsp;
            </span>
          </span>
        </blockquote>
      </div>
      <Instructor pros={pros} />
    </Layout>
  );
};
export default Instructors;
