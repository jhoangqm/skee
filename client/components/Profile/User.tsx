import { useEffect, useState, useRef } from "react";

const User = ({ user }) => {
  // const [Profile, setProfile] = useState(true);
  // const [Edit, setEdit] = useState(false);
  // const [History, setHistory] = useState(false);

  const [component, setComponent] = useState("Profile");
  const [skills, setSkills] = useState([]);
  const clearForm = useRef(null);

  const displaySkills = () => {
    const skillsMapped = user[0].ClientsSkills.map((s) => s.skills);
    const skillsArray = skillsMapped.map((s) => s.skill);
    setSkills(skillsArray);
  };

  useEffect(() => displaySkills(), []);

  const Profile = () => {
    return (
      <>
        <div className="flex justify-center">
          <div className="text-4xl">
            {user[0].firstName} {user[0].lastName}
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex justify-start h-80 w-80 bg-blue-200">
            <img src={user[0].avatar} alt="" />
          </div>
          <div className="flex h-80 w-80 bg-blue-200">
            {" "}
            Skills:
            <div className="justify-self-center self-center grid-rows-none">
              {skills[0]}
            </div>
          </div>
        </div>
        <div className="flex justify-around m-10">
          <div className="flex justify-start"></div>
          <div className="flex h-80 w-80 bg-blue-200">
            <div className="justify-self-center self-center"></div>
          </div>
        </div>
      </>
    );
  };

  const updateUserInfo = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber } = e.target;
    const data = {};
    data.uniqueID = user[0].id;
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    data.email = email.value;
    data.phoneNumber = phoneNumber.value;

    fetch(`/api/clients`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const Edit = ({ user }) => {
    return (
      <div className="self-center  w-full pr-60">
        <div className="py-8 px-16">
          <form method="patch" onSubmit={updateUserInfo} ref={clearForm}>
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
    );
  };
  // For:{'  '}
  // {new Date(booking.timeSlot.startTime)
  //   .toUTCString()
  //   .replace(/GMT/, ' ')}{' '}

  const History = ({ user }) => {
    return (
      <div key={user[0].id} className="flex justify-center">
        <>
          {user[0].bookings.map((booking) => (
            <div className="m-1 w-64 border border-transparent drop-shadow-md rounded-lg p-2 bg-primary flex justify-center flex-col">
              <ul>
                <li>
                  <p>
                    {booking.accepted === true && !booking.pending
                      ? `${booking.Pros.firstName} ${
                          booking.Pros.lastName
                        } is looking forward to seeing you on  ${"  "}${new Date(
                          booking.timeSlot.startTime
                        )
                          .toUTCString()
                          .replace(/GMT/, " ")}${" "} `
                      : `Your booking has not been accepted yet for ${"  "}${new Date(
                          booking.dateFrom
                        )
                          .toDateString()
                          .replace(/GMT/, " ")}${" "} with ${
                          booking.Pros.firstName
                        } ${booking.Pros.lastName}`}{" "}
                  </p>
                </li>
                <li>
                  <p></p>
                </li>
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
          ))}
        </>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-row w-auto justify-between ml-5 mt-40 ">
        <div className="ml-5 mt-40">
          <ul className="menu bg-base-100 w-56 p-2 rounded-box ml-5 mt-40">
            <li>
              <a
                onClick={() => {
                  setComponent("Profile");
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
                  setComponent("Edit");
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
                  setComponent("History");
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
          {component === "Profile" ? <Profile /> : null}
          {component === "Edit" ? <Edit user={user} /> : null}
          {component === "History" ? <History user={user} /> : null}
        </div>
      </div>
    </div>
  );
};

export default User;
