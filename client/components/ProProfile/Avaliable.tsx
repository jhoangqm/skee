import { MouseEvent, useEffect, useState } from 'react';

// Instructor sets a time that hes available
const TimeSetter = ({ setShowModal, date, fetchData, pro }: any) => {
  const [timeData, setTimeData] = useState<any>([{}]);
  let parsedDate = { date }.date.toISOString();
  useEffect(() => {
    timeFetcher();
  }, [date]);

  // fetches time..
  const timeFetcher = () => {
    fetch('/api/available', {
      method: 'POST',
      body: JSON.stringify({ date: parsedDate, proId: pro[0].id }),
    })
      .then(res => res.json())
      .then(data => {
        setTimeData(data);
      });
  };

  // booking function that sends query to API
  const booking = async (e: MouseEvent, date: any, time: string, pro: any) => {
    e.preventDefault();

    const bookingRequest = { date: date, time: time, proId: pro[0].id };

    fetch('/api/blockOff', {
      method: 'POST',
      body: JSON.stringify(bookingRequest),
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false);
        fetchData();
      });
  };
  // Allows instructor to create an AM or PM lesson
  const timeSetter = () => {
    if (!timeData[0])
      return (
        <>
          <li>
            <p onClick={e => booking(e, parsedDate, 'AM', pro)}>
              Create AM lesson
            </p>
          </li>
          <li>
            <a onClick={e => booking(e, parsedDate, 'PM', pro)}>
              Create PM lesson
            </a>
          </li>
        </>
      );
    const asDate = new Date(timeData[0].startTime);
    if (timeData.length === 2) return <div>You are available all day</div>;
    if (asDate?.getUTCHours() === 9) {
      return (
        <li>
          <a onClick={e => booking(e, parsedDate, 'PM', pro)}>
            Create PM lesson
          </a>
        </li>
      );
    } else if (asDate?.getUTCHours() === 13) {
      return (
        <li>
          <a onClick={e => booking(e, parsedDate, 'AM', pro)}>
            Create AM lesson
          </a>
        </li>
      );
    }
  };

  return (
    <div>
      <div>
        <div className="ava-drop">
          {/* <label tabIndex="0" className="btn m-1">Create booking for this day</label> */}
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {timeSetter()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeSetter;
