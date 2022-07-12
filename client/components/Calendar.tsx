import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CalMod from './CalendarModal';
import { useRouter } from 'next/router';
import { isWithinInterval } from 'date-fns';
import useSWR from 'swr';
import { Bookings } from '@prisma/client';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// * * * * * * * * * * * * * * * *
// ! this is for getting blocked off dates for pros
function isWithinRange(date: Date, range: Date[]) {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date: Date, ranges: Date[]) {
  return ranges.some(range => isWithinRange(date, range));
}
// * * * * * * * * * * * * * * * *

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());

  // * * * * * * * * * * * * * * * *
  // ! this is for getting blocked off dates for pros

  const { query } = useRouter();
  // TODO: hard coded query id this need to be dynamic from the modal
  query.id = '2';

  // fetches booking dates using proId from the database
  const { data, error } = useSWR<Bookings[]>(
    () => query.id && `/api/bookings/${query.id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const ranges = data.map(i => [new Date(i.dateFrom), new Date(i.dateTo)]);

  function tileDisabled({ date, view }: any) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      console.log(ranges);
      return isWithinRanges(date, ranges);
    }
  }
  // * * * * * * * * * * * * * * * *

  const openModal = () => {
    console.log('clicked to openModal');
    setShowModal(prev => !prev);
  };

  return (
    <div className="app">
      <h1 className="text-center">React Calendar</h1>
      <div className="flex justify-center">
        <div htmlFor="my-modal-4" className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={openModal}
            tileDisabled={tileDisabled}
          />
          <CalMod
            showModal={showModal}
            setShowModal={setShowModal}
            date={date}
          />
        </div>
      </div>
      <p className="text-center">
        <span className="bold">date selected</span> {date.toDateString()}
      </p>
    </div>
  );
}
