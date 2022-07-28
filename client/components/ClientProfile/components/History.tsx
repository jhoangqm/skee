const History = ({ user }) => {
  return (
    <div className="flex justify-center flex-wrap mt-16">
      {user[0].bookings.map(booking => (
        <div key={user[0].id}>
          {booking.accepted === true && !booking.pending ? (
            <>
              <div className="m-1 w-64 border border-transparent drop-shadow-md rounded-lg p-2 bg-success flex  justify-center flex-col">
                <ul>
                  <li>
                    <div className="mb-2">
                      {booking.Pros.firstName} {booking.Pros.lastName} is
                      looking forward to seeing you on {'  '}
                      {new Date(booking.timeSlot.startTime)
                        .toUTCString()
                        .replace(/GMT/, ' ')}
                    </div>
                  </li>
                </ul>

                <div className="flex justify-center">
                  <a
                    target="_blank"
                    className="btn btn-primary"
                    onClick={() => {
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${booking.Pros.email}&su=Booking%20request%20change`,
                        '_blank',
                        'location=yes, height=570, width=520, scrollbars=yes, status=yes'
                      );
                    }}
                  >
                    <ul>
                      <li>Contact instructor</li>
                      <li> to make changes</li>
                    </ul>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="m-1 w-64 border border-transparent drop-shadow-md rounded-lg p-2 bg-error flex  justify-center flex-col">
                <ul>
                  <li>
                    <div className="mb-2">
                      Your booking has not been accepted yet for {'  '}
                      {new Date(booking.dateFrom)
                        .toDateString()
                        .replace(/GMT/, ' ')}{' '}
                      with {booking.Pros.firstName} {booking.Pros.lastName}
                    </div>
                  </li>
                </ul>

                <div className="flex justify-center">
                  <a
                    target="_blank"
                    className="btn btn-info"
                    onClick={() => {
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${booking.Pros.email}&su=Booking%20request%20change`,
                        '_blank',
                        'location=yes, height=570, width=520, scrollbars=yes, status=yes'
                      );
                    }}
                  >
                    <ul>
                      <li>Contact instructor</li>
                      <li> to make changes</li>
                    </ul>
                  </a>
                </div>
              </div>
            </>
          )}{' '}
        </div>
      ))}
    </div>
  );
};

export default History;
