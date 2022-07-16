import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

function BookingRequests(props: { proId }) {
  const [request, setRequest] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  // const [error, setError] = useState(null)
  useEffect(() => fetchData(), []);
  useEffect(() => filterRequests(), [request]);
  const { query } = useRouter();
  query.id = props.proId;

  // Get request booking table all bookings that have pending ?
  // There's a problem in here somewhere the data is not consistent
  // It shows up randomly
  const fetchData = () => {
    fetch(`/api/bookings/${props.proId}`)
      .then(res => res.json())
      .then(data => setRequest(data));
  };

  const filterRequests = () => {
    const pendingStatus = request.filter(p => p.pending);
    const acceptedStatus = request.filter(p => p.accepted);
    setPendingRequest(pendingStatus);
    setAcceptedRequest(acceptedStatus);
  };

  // This works beautifully
  const togglePending = id => {
    fetch(`/api/bookings`, {
      method: 'PATCH',
      body: JSON.stringify(id),
    })
      .then(res => res.json())
      .then(() => fetchData());
  };
  const deleteBooking = id => {
    fetch(`/api/bookings`, {
      method: 'DELETE',
      body: JSON.stringify(id),
    })
      .then(res => res.json())
      .then(() => fetchData());
  };

  return (
    <>
      <div className="container">
        <div className="flex text text-xl justify-center underline">
          Total Pending requests: {pendingRequest.length}
        </div>
        <div className="flex flex-wrap justify-center">
          {pendingRequest &&
            pendingRequest.map(booking => (
              <div
                key={booking.id}
                className="m-1 w-64 border border-transparent drop-shadow-md rounded-lg p-2 bg-primary flex justify-center flex-col"
              >
                <p>
                  Pending from: {booking.clients.firstName}{' '}
                  {booking.clients.lastName}
                </p>
                <p>
                  For{' '}
                  {new Date(booking.timeSlot?.startTime)
                    .toUTCString()
                    .replace(/GMT/, ' ')}
                </p>
                <div className="flex ">
                  <button
                    className="btn btn-success w-1/2"
                    onClick={() => {
                      togglePending(booking.id);
                    }}
                  >
                    Accept booking
                  </button>
                  <button
                    className="btn btn-error w-1/2 mx-1"
                    onClick={() => {
                      deleteBooking(booking.id);
                    }}
                  >
                    Reject booking
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center text text-xl underline">
          Accepted requests: {acceptedRequest.length}
        </div>
        <div className="flex flex-wrap justify-center">
          {acceptedRequest.map(booking => (
            <div className="m-1 w-50 border border-transparent drop-shadow-md rounded-lg p-1 bg-primary">
              <div>
                <h2>
                  Client: {booking.clients.firstName} {booking.clients.lastName}
                </h2>
                <div>
                  For:{'  '}
                  {new Date(booking.timeSlot?.startTime)
                    .toUTCString()
                    .replace(/GMT/, '')}{' '}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BookingRequests;
