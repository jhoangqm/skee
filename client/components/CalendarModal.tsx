import useSWR from 'swr';
import { Pros } from '@prisma/client';
import { useState, useEffect } from 'react';

interface ProProps {
  resorts: Pros[];
}

const CalMod = ({ showModal, setShowModal, date, fetchData, proId }: any) => {
  const [timeData, setTimeData] = useState([{}]);
  const [user, setUser] = useState({});
  const [AMConfirm, setAMConfirm] = useState(false);
  const [PMConfirm, setPMConfirm] = useState(false);

  //fetch logged in user
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

  //fetch open timeslots
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

  //booking request function
  const booking = async (e: any, date: any, time: string, proId: string) => {
    e.preventDefault();
    const bookingRequest = {
      date: date,
      time: time,
      proId: proId,
      clientId: user?.id,
    };
    // post booking request
    fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingRequest),
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false);
        setAMConfirm(false);
        setPMConfirm(false);
        fetchData();
      });
  };

  //confirm booking modal
  const confirmBooking = (date: any, time: string, proId: string, num) => {
    return (
      <div className="flex justify-center flex-col">
        <button
          className="btn"
          onClick={() => {
            setAMConfirm(false), setPMConfirm(false);
          }}
        >
          Back
        </button>
        <p>
          Are you sure you want to book this date for {num}
          {time}?
        </p>
        <button className="btn" onClick={e => booking(e, date, time, proId)}>
          Confirm Booking
        </button>
      </div>
    );
  };

  //switchers for AM and PM state
  const AMConfirmSwitcher = () => {
    AMConfirm ? setAMConfirm(false) : setAMConfirm(true);
  };
  const PMConfirmSwitcher = () => {
    PMConfirm ? setAMConfirm(false) : setPMConfirm(true);
  };

  // post request for time slots
  const fetcher = (url: any) => fetch(url).then(res => res.json());
  const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const timeSetter = () => {
    if (!timeData[0])
      return <div className="flex justify-center">No time slots available</div>;

    const asDate = new Date(timeData[0].startTime);
    if (timeData.length === 2) {
      return (
        <>
          {AMConfirm ? (
            confirmBooking(date, 'AM', proId, 9)
          ) : (
            <li className="w-80">
              <p className="flex justify-center " onClick={AMConfirmSwitcher}>
                AM
              </p>
            </li>
          )}

          {PMConfirm ? (
            confirmBooking(date, 'PM', proId, 1)
          ) : (
            <li>
              <p className="flex justify-center" onClick={PMConfirmSwitcher}>
                PM
              </p>
            </li>
          )}
        </>
      );
    } else if (asDate?.getUTCHours() === 9) {
      return (
        <>
          {AMConfirm ? (
            confirmBooking(date, 'AM', proId, 9)
          ) : (
            <li className="w-80">
              <p className="flex justify-center" onClick={AMConfirmSwitcher}>
                AM
              </p>
            </li>
          )}
        </>
      );
    } else if (asDate?.getUTCHours() === 13) {
      return (
        <>
          {PMConfirm ? (
            confirmBooking(date, 'PM', proId, 1)
          ) : (
            <li className="w-80">
              <p className="flex justify-center" onClick={PMConfirmSwitcher}>
                PM
              </p>
            </li>
          )}
        </>
      );
    }
  };

  return (
    <>
      {showModal ? (
        <div className="cal-drop">
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-300px"
          >
            {timeSetter()}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default CalMod;
