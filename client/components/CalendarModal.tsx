import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';
import { useState, useEffect } from 'react';

interface ProProps {
  resorts: Pros[];
}

const CalMod = ({ showModal, setShowModal, date, fetchData }: any) => {
  const [timeData, setTimeData] = useState([{}]);
  let parsedDate = { date }.date.toISOString();

  useEffect(() => {
    timeFetcher();
  }, [date]);

  const timeFetcher = () => {
    fetch('/api/timeSlots', {
      method: 'POST',
      body: JSON.stringify({ date: parsedDate }),
    })
      .then(res => res.json())
      .then(data => {
        setTimeData(data);
      });
  };

  const booking = async (e, date: any, time: string) => {
    e.preventDefault();

    const bookingRequest = { date: date, time: time };
    fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingRequest),
    })
      .then(res => res.json())
      .then(setShowModal(false))
      .then(data => fetchData());
  };

  // post request for time slots

  const fetcher = (url: any) => fetch(url).then(res => res.json());
  const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const timeSetter = () => {
    const timeDataHours = new Date(timeData[0]?.startTime);
    if (timeData[0]?.startTime) {
      if (timeDataHours.getUTCHours() === 9) {
        return (
          <li>
            <a onClick={e => booking(e, parsedDate, 'PM')}>PM</a>
          </li>
        );
      }
      if (timeDataHours.getUTCHours() === 13) {
        return (
          <li>
            <a onClick={e => booking(e, parsedDate, 'AM')}>AM</a>
          </li>
        );
      }
    }
    return (
      <>
        <li>
          <p onClick={e => booking(e, parsedDate, 'AM')}>AM</p>
        </li>
        <li>
          <a onClick={e => booking(e, parsedDate, 'PM')}>PM</a>
        </li>
        <li>
          <a onClick={e => booking(e, parsedDate, 'DAY')}>Full Day</a>
        </li>
      </>
    );
  };
  return (
    <>
      {showModal ? (
        <div className="cal-drop">
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {timeSetter()}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default CalMod;
