import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { isWithinInterval, set, add } from 'date-fns';
import TimeSetter from './Avaliable';

// * * * * * * * * * * * * * * * *
// ! this is for getting blocked off dates for pros
function isWithinRange(date: Date, range: Date[]) {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date: Date, ranges: Date[]) {
  return ranges.some(range => isWithinRange(date, range));
}
// * * * * * * * * * * * * * * * *

export default function InstructorCalendar({ pro }) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appData, setAppData] = useState([]);
  const [error, setError] = useState(null);

  // * * * * * * * * * * * * * * * *
  // TODO: hard coded query id this need to be dynamic from the modal
  const enabled = 'react-calendar__tile__enabled';
  // fetches booking dates using proId from the database
  const fetchData = () => {
    // console.log('Fetching booking');
    fetch(`/api/available/${pro[0].id}`, {
      method: 'POST',
      body: JSON.stringify({ date, proId: pro[0].id }),
    })
      .then(res => res.json())
      .then(data => {
        setAppData(data);
      });
  };

  const ranges = appData.map(i => [
    add(set(new Date(i.day), { hours: 0o0, minutes: 0o0, seconds: 0o0 }), {
      days: 1,
    }),
    add(set(new Date(i.day), { hours: 0o0, minutes: 0o0, seconds: 0o0 }), {
      days: 1,
    }),
  ]);

  function tileAvailable({ date, view }: any) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      if (isWithinRanges(date, ranges)) {
        return enabled;
      }
    }
  }

  // * * * * * * * * * * * * * * * *

  const openModal = () => {
    // console.log('clicked to openModal');
    setShowModal(true);
  };

  useEffect(() => fetchData(), [showModal]);

  if (error) return <h1>Yo there was an Error {error}</h1>;

  return (
    <div className="app">
      <h1 className="text-center">React Calendar</h1>
      <div className="flex items-center flex-col">
        <div htmlFor="my-modal-4" className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={openModal}
            minDetail="year"
            tileClassName={tileAvailable}
          />
        </div>
        <p className="text-center">
          <span className="bold">date selected</span> {date.toDateString()}
        </p>
        <div className="form-control">
          <span className="text-m">
            * AM lesson starts at 9, PM lesson starts at 1 both are 3hr lessons
          </span>
        </div>
        {showModal ? (
          <TimeSetter
            setShowModal={setShowModal}
            date={date}
            fetchData={fetchData}
            pro={pro}
          />
        ) : null}
      </div>
    </div>
  );
}
