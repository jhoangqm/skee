import BookingRequests from '../BookingRequests';

import { useState } from 'react';
import InstructorCalendar from './InsCalender';
import Certification from './Certification/Certification';
import UploadCert from '../Upload/UploadCertification';
import UploadAvatar from '../Upload/UploadAvatar';
import Avatar from '../Avatar';

const Pro = ({ pro }) => {
  const [component, setComponent] = useState('Profile');
  const [certUpload, setCertUpload] = useState()
  // const [avatarUpload, setAvatarUpload] = useState(null)
  
  const Profile = ({ pro }) => {
    return (
      <>
        <div className="flex justify-between">
          <div className="text-4xl ml-[16vw]">
            {pro[0].firstName} {pro[0].lastName}{' '}
          </div>
        </div>
        <div className="flex justify-around">
          <div>
            <Avatar proId={pro[0].id} />
          </div>
          <div className="flex h-80 w-80 bg-blue-200">
            <div className="justify-self-center self-center">{pro[0].bio}</div>
          </div>
        </div>
      </>
    );
  };

  const updateUserInfo = (e) => {
    e.preventDefault();
    const {firstName, lastName, bio, email, phoneNumber} = e.target
    const data = {};
    data.uniqueID = pro[0].id
    data.firstName = firstName.value
    data.lastName = lastName.value
    data.bio = bio.value
    data.email = email.value  
    data.phoneNumber = phoneNumber.value
    console.log('Values: ', email.value)
    fetch(`/api/pros`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    .then((res)=>res.json())
  }
  
  const Edit = () => {
    
    const showCert = () => setCertUpload(true)  
    const unShowCert = () => setCertUpload(false);
  
    return (
      <>
      {certUpload ? (
        <div>
          <button className='btn btn-primary' onClick={unShowCert}>Upload Avatar</button>
          <UploadCert proId={pro[0].id} />
        </div>
      ) : (
        <div>
          <button className='btn btn-primary' onClick={showCert}>Upload Certification</button>
          <UploadAvatar proId={pro[0].id} />
        </div>
      )}
        <div className="md:w-2/3 w-full">
          <div className='py-8 px-16'>
          <form method='patch' onSubmit={updateUserInfo}>
            <div>
              <h1>Update your infomation here:</h1>
              <div className="form-control">
              <label className="input-group input-group-vertical">
                <span>First name</span>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder={pro[0].firstName}
                  className="input input-bordered" />
              </label>
              <label className="input-group input-group-vertical">
                <span>Last name</span>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"

                  placeholder={pro[0].lastName}
                  className="input input-bordered">

                </input>

              </label>
            </div>
          </div>
            <div>
              <div className="form-control">
                <label className="input-group input-group-vertical">
                  <span>Bio</span>
                  <input
                    type="bio"
                    name="bio"
                    id="bio"
                    minLength={1}
                    maxLength={140}
  
                    placeholder="bio"
                    className="input input-bordered" />
                </label>
              </div>
            </div>
            <div>
              <div className="form-control">
                <label className="input-group input-group-vertical">
                  <span>Email</span>
                  <input
                    type="text"
                    name="email"
                    id="email"
  
                    placeholder={pro[0].email}
                    className="input input-bordered" />
                </label>
              </div>
            </div>
            <div>
              <div className="form-control">
                <label className="input-group input-group-vertical">
                  <span>Phone</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phone"
                    maxLength={14}
                    minLength={10}
                    pattern="^\d{3}\d{3}\d{4}"
                    placeholder={pro[0].phoneNumber}
                    className="input input-bordered" />
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
          </div>
        </div>
        </>
    )
  };


  const Requests = ({ pro }) => {
    return (
      <div className="request-box flex flex-wrap w-full">
        <div className="justify-self-center self-center">
          <BookingRequests proId={pro[0].id} />
        </div>
      </div>
    );
  };
  const Avalibility = () => {
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
                    setComponent('Avalibility');
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
          {component === 'Avalibility' ? <Avalibility /> : null}
        </div>
      </div>
    </div>
  );
};

export default Pro;
