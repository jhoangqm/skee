import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CalMod from './CalendarModal';
import { add, isWithinInterval, set } from 'date-fns';

// TODO: error handling
// * * * * * * * * * * * * * * * *
// ! this is for getting available dates
function isWithinRange(date: Date, range: Date[]) {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date: Date, ranges: Date[]) {
  return ranges.some(range => isWithinRange(date, range));
}
// * * * * * * * * * * * * * * * *

export default function BookingCalendar(props: { proId; isDisabled }) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appData, setAppData] = useState([]);
  const [error, setError] = useState(null);

  // fetches booking dates using proId from the database
  const fetchAvailabilityData = () => {
    fetch(`/api/clientcalendar/${props.proId}`)
      .then(res => res.json())
      .then(data => {
        setAppData(data);
      });
  };

  // sets the ranges for the available calendar
  const ranges = appData.map(i => [
    add(set(new Date(i.day), { hours: 0o0, minutes: 0o0, seconds: 0o0 }), {
      days: 1,
    }),
    add(set(new Date(i.day), { hours: 0o0, minutes: 0o0, seconds: 0o0 }), {
      days: 1,
    }),
  ]);

  function tileEnabled({ date, view }: any) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      if (isWithinRanges(date, ranges)) {
        return 'react-calendar__tile__enabled';
      }
    }
  }

  const openModal = () => {
    setShowModal(true);
  };

  const disableTiles = () => {
    return props.isDisabled;
  };
  useEffect(() => fetchAvailabilityData(), [date]);

  if (error) return <h1>Yo there was an Error {error}</h1>;

  return (
    <div className="app">
      <div className="flex justify-center">
        <div htmlFor="my-modal-4" className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={openModal}
            minDetail="month"
            tileClassName={tileEnabled}
            tileDisabled={disableTiles}
          />
        </div>
      </div>
      <p className="text-center pt-5">
        <span className="bold">Date selected</span> {date.toDateString()}
      </p>
      <p className="flex justify-center text-sm">* All lessons are 3hrs long</p>
      <div className="flex justify-center">
        <CalMod
          showModal={showModal}
          setShowModal={setShowModal}
          date={date}
          fetchAvailabilityData={fetchAvailabilityData}
          proId={props.proId}
        />
      </div>
    </div>
  );
}
