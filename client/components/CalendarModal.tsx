import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Pros } from '@prisma/client';
import { prisma } from '../db';

import { useState, useEffect } from 'react';

interface ProProps {
  resorts: Pros[];
}

const CalMod = ({ showModal, setShowModal, date, fetchData, proId }: any) => {
  const [timeData, setTimeData] = useState([{}]);
  const [user, setUser] = useState({});
  const fetchUser = async (type: string) => {
    await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(type),
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'No such session') {
        } else setUser(data[0]);
      });
  };
  let parsedDate = { date }.date.toISOString();

  useEffect(() => {
    fetchUser('client');
  }, []);

  useEffect(() => {
    timeFetcher();
  }, [date]);

  const timeFetcher = () => {
    fetch('/api/timeSlots', {
      method: 'POST',
      body: JSON.stringify({ date: parsedDate, proId }),
    })
      .then(res => res.json())
      .then(data => {
        setTimeData(data);
      });
  };

  const booking = async (e, date: any, time: string, proId: string) => {
    e.preventDefault();

    const bookingRequest = {
      date: date,
      time: time,
      proId: proId,
      clientId: user?.id,
    };
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
    if (!timeData[0]) return <div>No time slots available</div>;
    console.log('time data', timeData);
    const asDate = new Date(timeData[0].startTime);
    if (timeData.length === 2) {
      return (
        <>
          <li>
            <p onClick={e => booking(e, parsedDate, 'AM', proId)}>AM</p>
          </li>
          <li>
            <a onClick={e => booking(e, parsedDate, 'PM', proId)}>PM</a>
          </li>
        </>
      );
    } else if (asDate?.getUTCHours() === 9) {
      return (
        <li>
          <a onClick={e => booking(e, parsedDate, 'AM', proId)}>AM</a>
        </li>
      );
    } else if (asDate?.getUTCHours() === 13) {
      return (
        <li>
          <a onClick={e => booking(e, parsedDate, 'PM', proId)}>PM</a>
        </li>
      );
    }
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
