import { useEffect, useState, useRef } from 'react';
import { Clients } from '@prisma/client';
import Profile from './components/Profile';
import Edit from './components/Edit';
import History from './components/History';

interface IUserProps {
  user: [Clients];
}

//this need to be refactored to be more modular and reusable
// all instances of User should be changed to client

const User = ({ user }: IUserProps) => {
  const [component, setComponent] = useState('Profile');
  const [skills, setSkills] = useState([]);
  const clearForm = useRef(null);

  // display the skills of a user
  const displaySkills = () => {
    const skillsMapped = user[0].ClientsSkills.map(s => s.skills);
    const skillsArray = skillsMapped.map(s => s.skill);
    setSkills(skillsArray);
  };

  useEffect(() => displaySkills(), []);

  {
    skills.length === 0 ? (
      <div className="text-xl">No skills selected</div>
    ) : (
      skills.map(s => (
        <li>
          <div className="text-xl">{s}</div>
        </li>
      ))
    );
  }
  

  // updates user info
  const updateUserInfo = e => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber } = e.target;
    const data = {};
    data.uniqueID = user[0].id;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.email = email.value;
    data.phoneNumber = phoneNumber.value;

    fetch(`/api/clients`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then(res => res.json());
  };

  // edit component ( should probably make a separate file will prob do it in the future)
 
  
  
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
            <li>
              <a
                onClick={() => {
                  setComponent('History');
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
                Booking History
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-between flex-col w-full">
          {component === 'Profile' ? <Profile user={user} skills={skills}/> : null}
          {component === 'Edit' ? <Edit user={user} updateUserInfo={updateUserInfo} clearForm={clearForm}/> : null}
          {component === 'History' ? <History user={user} /> : null}
        </div>
      </div>
    </div>
  );
};

export default User;
