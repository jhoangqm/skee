import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Resorts } from '@prisma/client';
import { prisma } from '../db';


const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());

interface ResortProps {
    resorts: Resorts[];
  }

const Carousel = () => {
  
  const { data, error } = useSWR<Resorts[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);

  
  return (
    <>
    {data.map((p, i: number)=> (
      <div key={i} className="carousel carousel-center max-w-20 p-4 space-x-4 bg-white rounded-box">
  <div className="carousel-item">
    <img src={p.image} className="rounded-box" />
  </div> 
</div>
    ))}
</>
  )
}

export default Carousel