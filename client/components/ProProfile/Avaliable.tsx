import useSWR from 'swr';
import { Pros } from '@prisma/client';
import { useEffect, useState } from 'react';

// interface ProProps {
//   resorts: Pros[];
// }

const TimeSetter = ({ setShowModal, date, fetchData, pro }: any) => {
  const [timeData, setTimeData] = useState([{}]);
  let parsedDate = { date }.date.toISOString();
  //send proId, time and date to DB
  // console.log("FETCHDATA", fetchData)
  useEffect(() => {
    timeFetcher();
  }, [date]);

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

  // const fetcher = (url: any) => fetch(url).then(res => res.json());
  // const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  const booking = async (e, date: any, time: string, pro: any) => {
    e.preventDefault();

    const bookingRequest = { date: date, time: time, proId: pro[0].id };

    fetch('/api/blockOff', {
      method: 'POST',
      body: JSON.stringify(bookingRequest),
    })
      .then(res => res.json())
      .then(setShowModal(false));
  };

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
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Select if you want full day option displayed
                </span>
                {/* <input type="checkbox" className="toggle" checked={false} /> */}
              </label>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeSetter;
