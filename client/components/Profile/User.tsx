import { useState } from "react";



const User = () => {
  
// const [Profile, setProfile] = useState(true);
// const [Edit, setEdit] = useState(false);
// const [History, setHistory] = useState(false);

const [component, setComponent] = useState("Profile");

  const Profile = () => {
return(
  <><div className="flex justify-center">
    <div className='text-4xl'>

    </div>
  </div><div className="flex justify-around">
      <div className="flex justify-start h-80 w-80 bg-blue-200">Picture
        {/* <div className="justify-self-center self-center">Picture
<Upload/>
</div> */}

      </div>
      <div className="flex h-80 w-80 bg-blue-200">
        <div className="justify-self-center self-center"></div>
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
  
  
  const Edit = () => {
  return(
    <div className="flex justify-center"> 
     <form method="post" >
      <div className="flex items-center flex-row">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="First Name"
          className="input input-bordered w-full max-w-xs m-1"
        />
        <label htmlFor="lastName">Last Name</label>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={5}
          maxLength={20}
          required
          placeholder="Password"
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
    </form>
    
    </div>
  )
  }

  const History = () => {
    return(
      <div className="flex justify-center">gdsfgsdfgsdfgsfgsfdsdfsdfgsdfgsdfgsdfgsfdgsdfg</div>
    )
    }
  
  
  return (
    <>
      <ul className="menu bg-base-100 w-56 p-2 rounded-box">
        <li>
          <a onClick={() => {setComponent('Profile')}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
            Profile 
          </a>
        </li>
        <li>
          <a onClick={() => {setComponent('Edit')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
            Edit Profile
          </a>
        </li>
        <li>
          <a onClick={() => {setComponent('History')}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Booking History
          </a>
        </li>
      </ul>
      {component === "Profile"? <Profile /> : null}
      {component === "Edit" ? <Edit /> : null}
      {component === "History" ? <History /> : null}
      </>

  )
}

export default User
