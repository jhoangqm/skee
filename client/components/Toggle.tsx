
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';


const fetcher = (url: any) => fetch(url).then(res => res.json());

interface ProProps {
  resorts: Pros[];
}

const Toggle= () => {

  const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data);


  return (
    <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Filters</span>
    <input type="checkbox" className="toggle toggle-secondary" checked />
  </label>
</div>
  )
}

export default Toggle