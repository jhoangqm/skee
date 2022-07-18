import BookingRequests from '../BookingRequests';

import { useState, useRef } from 'react';
import InstructorCalendar from './InsCalender';
import Certification from './Certification/Certification';
import UploadCert from '../Upload/UploadCertification';
import UploadAvatar from '../Upload/UploadAvatar';
import Avatar from '../Avatar';

const Pro = ({ pro }) => {
  const [component, setComponent] = useState('Profile');
  const [certUpload, setCertUpload] = useState();
  const clearForm = useRef(null);
  // const [avatarUpload, setAvatarUpload] = useState(null)

  const Profile = ({ pro }) => {
    return (
      <div className="flex flex-col w-[86%]">
        <div className="flex justify-center">
          <div className="mt-10">
            <Avatar proId={pro[0].id} />
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal  text-gray-800 mb-2">
            {pro[0].firstName} {pro[0].lastName}{' '}
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{' '}
            Vancouver, British Columbia
          </div>
          <div className="mb-2 text-gray-700 mt-10">
            <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
            Ski Instructor
          </div>
          <div className="mb-2 text-gray-700">
            <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
            University of British Columbia
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-gray-300 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-gray-800">
                {pro[0].bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // <div className="flex justify-between">
  //   <div className="text-4xl ml-[16vw]">
  //   <h3 className='text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2'>
  //     {pro[0].firstName} {pro[0].lastName}{' '}
  //       </h3>
  //   </div>
  // </div>
  // <div className="flex justify-around ">
  //   <div>
  //     <Avatar proId={pro[0].id} />
  //   </div>
  //   <div className="flex h-80 w-80 bg-blue-200">
  //     <div className="justify-self-center self-center">{pro[0].bio}</div>
  //   </div>
  // </div>

  const updateProInfo = e => {
    e.preventDefault();
    const { firstName, lastName, bio, email, phoneNumber } = e.target;
    const data = {};
    data.uniqueID = pro[0].id;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.bio = bio.value;
    data.email = email.value;
    data.phoneNumber = phoneNumber.value;
    console.log('Values: ', email.value);
    fetch(`/api/pros`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        e.target.reset();
      });
  };

  const Edit = () => {
    const showCert = () => setCertUpload(true);
    const unShowCert = () => setCertUpload(false);

    return (
      <div className="w-[86%] flex flex-col justify-center my-5">
        {certUpload ? (
          <div className="self-center ">
            <button className="btn btn-primary" onClick={unShowCert}>
              Click to Upload Avatar
            </button>
            <UploadCert proId={pro[0].id} />
          </div>
        ) : (
          <div className="self-center ">
            <button className="btn btn-primary" onClick={showCert}>
              Click to Upload Certification
            </button>
            <UploadAvatar proId={pro[0].id} />
          </div>
        )}
        <div className="self-center w-full ">
          <div className="py-8 px-16">
            <form method="patch" onSubmit={updateProInfo} ref={clearForm}>
              <div className="flex items-center flex-col">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="First Name"
                  className="input input-bordered w-full max-w-xs m-1"
                />
              </div>
              <div className="flex items-center flex-col">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  placeholder="Last Name"
                  className="input input-bordered w-full max-w-xs m-1"
                />
              </div>
              <div className="flex items-center flex-col">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs m-1"
                />
              </div>
              <div className="flex items-center flex-col">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phone"
                  maxLength={14}
                  minLength={10}
                  pattern="^\d{3}\d{3}\d{4}"
                  placeholder="(000) 000-0000"
                  className="input input-bordered w-full max-w-xs m-1"
                />
              </div>
              <div className="flex items-center flex-col">
                <label htmlFor="phone">Bio:</label>
                <textarea
                  name="bio"
                  id="bio"
                  maxLength={140}
                  minLength={1}
                  placeholder="Enter your bio information here"
                  className="textarea textarea-bordered w-full max-w-xs m-1 mb-5"
                ></textarea>
              </div>

              <div className="flex items-center flex-col">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/3"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Update profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const Requests = ({ pro }) => {
    return (
      <div className="request-box flex flex-wrap w-[86%]">
        <div className="justify-self-center self-center">
          <BookingRequests proId={pro[0].id} />
        </div>
      </div>
    );
  };
  const Availability = () => {
    return <InstructorCalendar pro={pro} />;
  };

  return (
    <div className="">
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
          {component === 'Edit' ? <Edit /> : null}
          {component === 'Requests' ? <Requests pro={pro} /> : null}
          {component === 'Availability' ? <Availability /> : null}
        </div>
      </div>
    </div>
  );
};

export default Pro;
