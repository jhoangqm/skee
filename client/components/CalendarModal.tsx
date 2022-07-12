import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';
import { useState } from 'react';

interface ProProps {
  resorts: Pros[];
}

const CalMod = ({ showModal, setShowModal, date, fetchData }) => {
  let parsedDate = { date }.date.toISOString();

  const booking = async (e, date: any) => {
    e.preventDefault();
    fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(date),
    })
      .then(res => res.json())
      .then(data => fetchData());
  };

  const fetcher = (url: any) => fetch(url).then(res => res.json());
  const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {showModal ? (
        <div className="cal-drop">
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <p onClick={e => booking(e, parsedDate)}>AM</p>
            </li>
            <li>
              <a onClick={() => {}}>PM</a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default CalMod;
