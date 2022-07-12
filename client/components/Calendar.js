import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CalMod from './CalendarModal';
import { isWithinInterval } from 'date-fns';
import useSWR from 'swr';
import { Bookings } from '@prisma/client';

// const fetcher = (url: string) => fetch(url).then(res => res.json());

// fetches all booking dates from the database


const isWithinRange = (date, ranges) => {
  if (date >= ranges[0] && date <= ranges[1]) {
    return true;
  }
  return false;
};




// const {data, error} = useSWR<Bookings[]>('/api/bookings', fetcher);
// if (error) return <div>failed to load</div>;
// if (!data) return <div>loading...</div>;



export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [disabledRanges, setDisabledRanges] = useState([
    new Date(2022, 6, 10),
    new Date(2022, 6, 15),
  ]);
  console.log('dis', disabledRanges);

  

  // useEffect(() => {
  //   setDisabledRanges([[date[0], date[1]]]);
  // }, [date]);

  function tileDisabled({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      // console.log('date', date);
      // console.log('disabled', disabledRanges);
      // console.log('within range',isWithinRange(date, disabledRanges)) 
      return isWithinRange(date, disabledRanges);
    }
  }
    
    

  const openModal = () => {
    console.log('clicked to openModal');
    setShowModal(prev => !prev)
  }

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
          <CalMod showModal={showModal} setShowModal={setShowModal} date={date}/>
        </div>
      </div>
        <p className="text-center">
          <span className="bold">date selected</span> {date.toDateString()}
        </p>
      
    </div>
  );
};

