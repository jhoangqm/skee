import BookingCalendar from "../Calendar"
import BookingRequests from "../BookingRequests"

import { useState } from "react";
import InstructorCalendar from "./InsCalender";
import Certification from "./Certification/Certification";
import Upload from "../uploads";



const Pro = ({ pro }) => {

  const [component, setComponent] = useState("Profile");


  const Profile = ({ pro }) => {

    return (
      <><div className="flex justify-center">
        <div className='text-4xl'>
          {pro[0].firstName} {pro[0].lastName}{' '}
        </div>
      </div><div className="flex justify-around">
          <div className="flex justify-start h-80 w-80 bg-blue-200"><Certification proId={pro[0].id}/>
            {/* <div className="justify-self-center self-center">Picture
    <Upload/>
    </div> */}

          </div>
          <div className="flex h-80 w-80 bg-blue-200">
            <div className="justify-self-center self-center">{pro[0].bio}</div>
          </div>
        </div></>
    )
  }
  const Edit = () => {
    return (
      <div><Upload proId={pro[0].id}/></div>
    )
  }
  const Requests = ({ pro }) => {
    return (
      <div>
        <div className="flex justify-around m-10">
          <div className="flex justify-start">
            <BookingCalendar proId={pro[0].id} />
          </div>
        </div>
        <div className="flex h-80 w-80 bg-blue-200">
          <div className="justify-self-center self-center">
            <BookingRequests proId={pro[0].id} />
          </div>
        </div>
      </div>
    )
  }
  const Avalibility = () => {
    return (
      <InstructorCalendar pro={pro}/>
    )
  }



  return (
    <div>
    <div>
      <ul className="menu bg-base-100 w-56 p-2 rounded-box">
        <li>
          <a onClick={() => { setComponent('Profile') }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Profile
          </a>
        </li>
        <li>
          <a onClick={() => { setComponent('Edit') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
            Edit Profile
          </a>
        </li>
        <li>
          <a onClick={() => { setComponent('Requests') }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Booking Requests
          </a>
        </li><div className="indicator">
          <li>
            <span className="indicator-item indicator-bottom indicator-end badge badge-secondary">In Testing</span>
            <a onClick={() => { setComponent('Avalibility') }}>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Edit Avalibility
            </a>
          </li></div>
      </ul>
      
      </div>
      <div>
      {component === "Profile" ? <Profile pro={pro} /> : null}
      {component === "Edit" ? <Edit /> : null}
      {component === "Requests" ? <Requests pro={pro} /> : null}
      {component === "Avalibility" ? <Avalibility /> : null}
      </div>
</div>
  )
}

export default Pro