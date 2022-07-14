import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function BookingRequests(props: {proId}) {
  const [request, setRequest] = useState([])
  // const [error, setError] = useState(null)
  
  // Get request booking table all bookings that have pending ?
  // fetch from api the booking table, specifically the pending
  const { query } = useRouter();
  query.id = props.proId;

  const fetchData = () => {
    fetch(`/api/bookings/${props.proId}`)
    .then(res => res.json())
    .then(data => setRequest(data));
  }

  useEffect(()=> fetchData, [])
  
  const togglePending = (id) => {
    fetch(`/api/bookings`, {
      method: 'PATCH',
      body: JSON.stringify(id)
    })
    .then(res => res.body)
    .then(data => fetchData())
  }
  
  console.log("GET DB info: ", request)
  const pendingStatus = request.filter(p=>p.pending);
  const acceptedStatus = request.filter(p=>p.accepted)
  // const pendingStatusTrue = (pendingStatus !== false)
  console.log('Pending Status: ', pendingStatus)
  // console.log('Pending Status True: ', pendingStatusTrue)
  console.log('Accepted Status: ', acceptedStatus);

  // button that's going to make an update request change pending to accepted ?
  // check over requests to see if there's a pending request
  // if pending request is true, we need to set it to false
  // after that it is set to false we need to set accepted to true
  
  // Needs two section 
  // Pending requests
  // Accepted requests

  // if (error) return <h1>Yo there was an Error {error}</h1>;

  return (
    <>
    <div className='container'>
      <h1 className='text-center'>Booking requests</h1>
      <div className='contents text text-xl'> 
      Total Pending requests: {pendingStatus.length}
      </div> 
      <div>
      { acceptedStatus === true ? request.map((booking)=>{
    return <div>Pending from user: {booking.clientId}:
    <button 
    className='btn btn-primary' 
    onClick={() => {
      togglePending(booking.id)
    }}
    >Accept booking</button>
    </div>
  }) : null }
      <div className='text text-xl'>
        Accepted requests: {acceptedStatus.length}
      {/* {request.map((booking) => {
        return <div>Request accepted: {booking.id}</div>
      })} */}
      </div>
      </div>
    </div>
    </>
  )
}

export default BookingRequests;