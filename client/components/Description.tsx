import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';


const fetcher = (url:any) => fetch(url).then(res => res.json());

interface ProProps {
  resorts: Pros[];
}

const Instructor = () => {

  const { data, error } = useSWR<Pros[]>('/api/pros', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;


  return (
    <>
      <div className="flex flex-wrap justify-center mt-5">
        {data.map((p, i: number) => (
    <div className="card w-96 bg-base-100 shadow-xl m-6">
    <figure>
            <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
          </figure><div key={i} className="card-body">
              <h2 className="card-title">
                {p.name}
              </h2>
              <p>{p.bio}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{p.certBody}</div>
                <div className="badge badge-outline">{p.level}</div>
              </div>
            </div></div>
            
        ))}
      </div>
    </>

  )
}

export default Instructor

