import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function BookingRequests(props: {proId}) {
  const [request, setRequest] = useState([])
  const [showButton, setShowButton] = useState(true)
  const [hideText, setHideText] = useState(true)
  
  // Get request booking table all bookings that have pending ?
  // fetch from api the booking table, specifically the pending
  const { query } = useRouter();
  query.id = props.proId;

  const fetchData = () => {
    fetch(`/api/bookings/${props.proId}`)
    .then(res => res.json())
    .then(data => setRequest(data))}

  useEffect(()=> fetchData, [])

  // console.log("GET DB info: ", request)
  const pendingStatus = request.map(p=>p.pending === true);
  console.log('Pending Status: ', pendingStatus)
  console.log('request: ', request)
  
  
  const togglePending = (id) => {
    fetch(`/api/bookings`, {
      method: 'PATCH',
      body: JSON.stringify(id)
    })
      .then(res => res.body)
      // .then(()=> setShowButton(false))
      // .then(() => setHideText(false))
  }

  // button that's going to make an update request change pending to accepted ?
  // check over requests to see if there's a pending request
  // if pending request is true, we need to set it to false
  // after that it is set to false we need to set accepted to true

  
  return (
    <>
    <div className='container'>
      <h1 className='text-center'>Booking requests</h1>
      <div className='flex flex-col'>
      {request.map((booking)=>{
        return <div>Pending from user: {booking.clientId}:
        {showButton && (<button 
        className='btn btn-primary' 
        onClick={() => {
          togglePending(booking.id)
        }}
        >Accept booking</button>)}
        </div>
      })}
      
      </div>
    </div>
    </>
  )
}

export default BookingRequests;