import useSWR from 'swr';
import { Pros, timeSlots } from '@prisma/client';
import { useState, useEffect, ReactElement, Dispatch } from 'react';

interface IUser {
  id?: number;
}

interface ICalMod {
  showModal: ReactElement;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  date: Date;
  fetchAvailabilityData: () => {};
  proId: string;
}

const CalMod = ({
  showModal,
  setShowModal,
  date,
  fetchAvailabilityData,
  proId,
}: ICalMod) => {
  const [timeData, setTimeData] = useState<timeSlots[]>([]);
  const [user, setUser] = useState<IUser>({});
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
        } else setUser(data.userSession[0]);
      });
  };

  let parsedDate = { date }.date.toISOString();

  useEffect(() => {
    fetchUser('client');
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
  const booking = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    date: Date,
    time: string,
    proId: string
  ) => {
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
        timeFetcher();
        fetchAvailabilityData();
      });
  };

  //confirm booking modal
  const confirmBooking = (
    date: Date,
    time: string,
    proId: string,
    num: number
  ) => {
    return (
      <div className="flex justify-center flex-col">
        <p>
          Are you sure you want to book this date for {num}
          {time}?
        </p>
        <div className="flex justify-center w-full">
          <button
            className="btn mr-5 bg-error hover:bg-orange-600"
            onClick={() => {
              setAMConfirm(false), setPMConfirm(false);
            }}
          >
            Back
          </button>
          <button
            className="btn w-1/2 bg-primary"
            onClick={e => booking(e, date, time, proId)}
          >
            Confirm Booking
          </button>
        </div>
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
  const fetcher = (url: URL) => fetch(url).then(res => res.json());
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
                9 AM
              </p>
            </li>
          )}

          {PMConfirm ? (
            confirmBooking(date, 'PM', proId, 1)
          ) : (
            <li>
              <p className="flex justify-center" onClick={PMConfirmSwitcher}>
                1 PM
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
                9 AM
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
                1 PM
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
