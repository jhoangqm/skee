import { useState, useRef, useEffect } from 'react';
import InstructorCalendar from './InsCalender';
import Requests from './components/Requests';
import Edit from './components/Edit';
import Profile from './components/Profile';
import { Pros } from '@prisma/client';
import { useRouter } from 'next/router';

interface IProProps {
  pro: [Pros];
}
interface IForm {
  uniqueID?: number;
  firstName?: string;
  lastName?: string;
  bio?: string;
  email?: string;
  phoneNumber?: string;
}
interface IEvent {
  target?: any;
  preventDefault: () => void | undefined;
}

const Pro = ({ pro }: IProProps) => {
  const [component, setComponent] = useState<string>('Profile');
  const [notification, setNotification] = useState([]);
  const [bubble, setBubble] = useState([]);
  const clearForm = useRef(null);
  const router = useRouter();

  // Function that updates the pro info
  const updateProInfo = (e: IEvent) => {
    e.preventDefault();
    const { firstName, lastName, bio, email, phoneNumber } = e.target;
    const data: IForm = {};
    data.uniqueID = pro[0].id;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.bio = bio.value;
    data.email = email.value;
    data.phoneNumber = phoneNumber.value;

    fetch(`/api/pros`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        e.target.reset();
        router.push(`/profile/pro/${pro[0].id}`);
        setComponent('Profile');
      });
  };

  const fetchData = () => {
    fetch(`/api/bookings/${pro[0].id}`)
      .then(res => res.json())
      .then(data => setNotification(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    filterRequests();
  }, [notification]);

  const filterRequests = () => {
    const pendingStatus = notification.filter(
      (p: { pending: number }) => p.pending
    );

    if (pendingStatus.length > 0) {
      setBubble(pendingStatus);
    }
  };

  return (
    <div className="mt-28 ml-5">
      <div className="flex flex-row w-auto justify-between">
        <div>
          <ul className="menu bg-base-100 w-56 p-2 rounded-box">
            <li>
              <a
                onClick={() => {
                  setComponent('Profile');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                  <circle cx="12" cy="10" r="3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setComponent('Edit');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                </svg>
                Edit Profile
              </a>
            </li>

            {bubble.length === 0 ? (
              <li>
                <a
                  onClick={() => {
                    setComponent('Requests');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Booking Requests
                </a>
              </li>
            ) : (
              <div className="indicator">
                <li>
                  <span className="indicator-item badge badge-primary">
                    {bubble.length}
                  </span>

                  <a
                    onClick={() => {
                      setComponent('Requests');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Booking Requests
                  </a>
                </li>{' '}
              </div>
            )}

            <div className="indicator">
              <li>
                <a
                  onClick={() => {
                    setComponent('Availability');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Edit Availability
                </a>
              </li>
            </div>
          </ul>
        </div>
        <div className="flex justify-between flex-col w-full">
          {component === 'Profile' ? <Profile pro={pro} /> : null}
          {component === 'Edit' ? (
            <Edit
              pro={pro}
              updateProInfo={updateProInfo}
              clearForm={clearForm}
            />
          ) : null}
          {component === 'Requests' ? <Requests pro={pro} /> : null}
          {component === 'Availability' ? (
            <InstructorCalendar pro={pro} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Pro;
