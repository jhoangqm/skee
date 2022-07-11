

import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';
import Toggle from './toggle';


const fetcher = (url: any) => fetch(url).then(res => res.json());

interface ProProps {
  resorts: Pros[];
}

const Alt = () => {

  return(
<div className="dropdown dropdown-hover">
  <label tabIndex="0" class="btn m-1">Filter your instructor on Hover</label>
  <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <Toggle/>
    <Toggle/>
    <Toggle/>
    <Toggle/>
    <Toggle/>
  </ul>
</div>

  )
}

export default Alt