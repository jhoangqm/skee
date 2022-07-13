import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CalMod from './CalendarModal';
import { useRouter } from 'next/router';
import { isWithinInterval } from 'date-fns';
import useSWR from 'swr';
import { Bookings } from '@prisma/client';

// * * * * * * * * * * * * * * * *
// ! this is for getting blocked off dates for pros
function isWithinRange(date: Date, range: Date[]) {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date: Date, ranges: Date[]) {
  return ranges.some(range => isWithinRange(date, range));
}
// * * * * * * * * * * * * * * * *

export default function BookingCalendar(props: { proId }) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appData, setAppData] = useState([]);
  const [error, setError] = useState(null);

  // * * * * * * * * * * * * * * * *
  // ! this is for getting blocked off dates for pros

  const { query } = useRouter();
  // TODO: hard coded query id this need to be dynamic from the modal
  query.id = props.proId;

  // fetches booking dates using proId from the database
  const fetchData = () => {
    console.log('Fetching booking');
    fetch(`/api/bookings/${props.proId}`)
      .then(res => res.json())
      .then(data => setAppData(data));
  };

  const ranges = appData.map(i => [new Date(i.dateFrom), new Date(i.dateTo)]);

  function tileDisabled({ date, view }: any) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      return isWithinRanges(date, ranges);
    }
  }

  // * * * * * * * * * * * * * * * *

  const openModal = () => {
    console.log('clicked to openModal');
    setShowModal(prev => !prev);
  };

  useEffect(() => fetchData(), []);

  if (error) return <h1>Yo there was an Error {error}</h1>;

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
            fetchData={fetchData}
          />
        </div>
      </div>
      <p className="text-center">
        <span className="bold">date selected</span> {date.toDateString()}
      </p>
    </div>
  );
}
