import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';
import { useState } from 'react';


const fetcher = (url: any) => fetch(url).then(res => res.json());

interface ProProps {
  resorts: Pros[];
}

const booking = async (e, date: any) => {
  e.preventDefault()
  const response = await fetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(date)
  });
  const json = await response.json();
};

const CalMod = ({ showModal, setShowModal, date }) => {
  let parsedDate = {date}.date.toISOString()
  console.log("parsedDate ", parsedDate)
  
 
  const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data);


  return (
    <>
      {showModal ? <div className="cal-drop">
  <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a onClick={e => booking(e, parsedDate)}>AM</a></li>
    <li><a onClick={() => {}}>PM</a></li>
  </ul>
</div>

      
        : null}
    </>
  )
}

export default CalMod