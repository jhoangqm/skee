import { useEffect, useState } from "react";



const User = ({ user }) => {

  // const [Profile, setProfile] = useState(true);
  // const [Edit, setEdit] = useState(false);
  // const [History, setHistory] = useState(false);

  const [component, setComponent] = useState("Profile");
  const [skills, setSkills] = useState([])

  const displaySkills = () => {
    const skillsMapped = user[0].ClientsSkills.map(s => s.skills)
    const skillsArray = skillsMapped.map(s => s.skill)
      setSkills(skillsArray)
  }

  useEffect(()=> displaySkills(),[])

console.log('skills: ', skills)
  
  const Profile = () => {
    return (
      <><div className="flex justify-center">
        <div className='text-4xl'>
          {user[0].firstName}{' '}{user[0].lastName}

        </div>
      </div><div className="flex justify-around">
          <div className="flex justify-start h-80 w-80 bg-blue-200">
            <img src={user[0].avatar} alt="" />
          </div>
          <div className="flex h-80 w-80 bg-blue-200"> Skills: 
            <div className="justify-self-center self-center grid-rows-none"> 
              {skills[0]}
            </div>
          </div>
        </div><div className="flex justify-around m-10">
          <div className="flex justify-start">

          </div>
          <div className="flex h-80 w-80 bg-blue-200">
            <div className="justify-self-center self-center">

            </div>
          </div>
        </div></>
    )
  }

  const updateUserInfo = (e) => {
    e.preventDefault();
    const {firstName, lastName, email, phoneNumber} = e.target
    const data = {};
    data.uniqueID = user[0].id
    data.firstName = firstName.value
    data.lastName = lastName.value
    data.email = email.value  
    data.phoneNumber = phoneNumber.value
    console.log('Values: ', e.target.firstName.value)
    fetch(`/api/clients`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    .then((res)=>res.json())
  }

  const Edit = () => {
    console.log("BIG USER", user[0].firstName);
    return (
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

                  placeholder={user[0].firstName}
                  className="input input-bordered" />
              </label>
              <label className="input-group input-group-vertical">
                <span>Last name</span>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"

                  placeholder={user[0].lastName}
                  className="input input-bordered">

                </input>

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
                  placeholder={user[0].phoneNumber}
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

                  placeholder={user[0].email}
                  className="input input-bordered" />
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        </div>
      </div>
    )
  }
  // For:{'  '}
  // {new Date(booking.timeSlot.startTime)
  //   .toUTCString()
  //   .replace(/GMT/, ' ')}{' '}

  const History = ({ user }) => {
    console.log(user[0].bookings[0])
    return (
      <div key={user[0].id} className="flex justify-center">
        <>
          {user[0].bookings.map((booking) => (
            <div className="m-1 w-64 border border-transparent drop-shadow-md rounded-lg p-2 bg-primary flex justify-center flex-col">
              <ul>
                <li><p>{booking.accepted === true && !booking.pending ? `${booking.Pros.firstName} ${booking.Pros.lastName} is looking forward to seeing you on  ${'  '}${new Date(booking.timeSlot.startTime)
                    .toUTCString()
                    .replace(/GMT/, ' ')}${' '} ` : `Your booking has not been accepted yet for ${'  '}${new Date(booking.dateFrom)
                      .toDateString()
                      .replace(/GMT/, ' ')}${' '} with ${booking.Pros.firstName} ${booking.Pros.lastName}`} </p></li>
                <li><p>
                    </p></li>
              </ul>
              <div className="flex justify-center">
              <button className="btn btn-success ">
                <ul>
                  <li>Contact instructor</li>
                  <li> to make changes</li>
                </ul>
                
              </button>
              </div>
            </div>
          ))}</>
      </div>
    )
  }


  return (
    <>
      <ul className="menu bg-base-100 w-56 p-2 rounded-box">
        <li>
          <a onClick={() => { setComponent('Profile') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
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
          <a onClick={() => { setComponent('History') }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Booking History
          </a>
        </li>
      </ul>
      {component === "Profile" ? <Profile /> : null}
      {component === "Edit" ? <Edit user={user} /> : null}
      {component === "History" ? <History user={user} /> : null}
    </>

  )
}

export default User
