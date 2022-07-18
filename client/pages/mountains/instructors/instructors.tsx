import Layout from "../../../components/Layout";
import Instructor from "../../../components/Instructor";
import styles from "../../../styles/Home.module.css";
import Filter from "../../../components/Filter";
import useSWR from "swr";
import { Pros, Resorts } from "@prisma/client";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

interface ResortProps {
  resorts: Resorts[];
}

interface ProProps {
  resorts: Pros[];
}

const Instructors = () => {
  const { data, error } = useSWR<Pros[]>("/api/pros/", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const pro = data;

  return (
    <Layout>
      <div className="mt-20">
        <h2 className="text-7xl font-semibold text-center text-slate-900">
          These are all of the instructors that you selected
        </h2>
        <blockquote className=" text-3xl  text-center text-slate-900 mt-10 mb-10">
          Your are currently looking at all instructors in&nbsp;
          <span className=" before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-info relative inline-block">
            <span className="relative text-white">&nbsp;Canada&nbsp;</span>
          </span>
        </blockquote>
      </div>
      {/* <Filter pros={pro}/> */}
      <Instructor pros={pro} />
    </Layout>
  );
};
export default Instructors;
