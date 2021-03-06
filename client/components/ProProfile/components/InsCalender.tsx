import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { isWithinInterval, set, add } from 'date-fns';
import TimeSetter from '../Avaliable';
import { Pros } from '@prisma/client';
interface IProProps {
  pro: [Pros];
}

// ! for getting blocked off dates for pros
function isWithinRange(date: Date, range: Date[]) {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date: Date, ranges: any[]) {
  return ranges.some(range => isWithinRange(date, range));
}

export default function InstructorCalendar({ pro }: IProProps) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appData, setAppData] = useState([]);
  const [error, setError] = useState<boolean>(false);

  const enabled = 'react-calendar__tile__enabled';
  // fetches booking dates using proId from the database
  const fetchData = () => {
    fetch(`/api/available/${pro[0].id}`, {
      method: 'POST',
      body: JSON.stringify({ date, proId: pro[0].id }),
    })
      .then(res => res.json())
      .then(data => {
        setAppData(data);
      })
      .catch(error => setError(true));
  };

  const rangesArr: Date[][] = appData.map((i: { day: Date }) => [
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
      if (isWithinRanges(date, rangesArr)) {
        return enabled;
      }
    }
  }

  // modal function
  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => fetchData(), [showModal]);

  if (error) return <h1>Yo there was an Error {error}</h1>;

  return (
    <div className="app w-[87%]">
      <div className="flex items-center flex-col mb-32 mt-10">
        <div className="flex justify-center">
          <h1 className="font-bold mb-5 text-2xl">Select your availability</h1>
        </div>
        <div htmlFor="my-modal-4" className="calendar-container w-auto">
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
          <span className="text-sm">
            * Morning lesson starts at 9AM. Afternoon lesson starts at 1PM. Both
            are 3hr lessons
          </span>
        </div>
        {showModal ? (
          <TimeSetter
            showModal={showModal}
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
