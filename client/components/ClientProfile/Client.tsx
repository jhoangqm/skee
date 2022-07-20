import { useEffect, useState, useRef } from "react";

const User = ({ user }) => {
  const [component, setComponent] = useState("Profile");
  const [skills, setSkills] = useState([]);
  const clearForm = useRef(null);

  // display the skills of a user
  const displaySkills = () => {
    const skillsMapped = user[0].ClientsSkills.map((s) => s.skills);
    const skillsArray = skillsMapped.map((s) => s.skill);
    setSkills(skillsArray);
  };

  useEffect(() => displaySkills(), []);

  {
    skills.length === 0 ? (
      <div className="text-xl">No skills selected</div>
    ) : (
      skills.map((s) => (
        <li>
          <div className="text-xl">{s}</div>
        </li>
      ))
    );
  }
  const Profile = () => {
    return (
      <div className="flex flex-col  w-[86%]">
        <div className="flex justify-center ">
          <div className="imageBox mt-10">
            <img
              src={user[0].image}
              alt="Profile picture"
              className="shadow-xl rounded-full h-auto align-middle border-none "
              style={{ maxWidth: "150px" }}
            />
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal  text-gray-800 mb-2">
            {user[0].firstName} {user[0].lastName}{" "}
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
            Vancouver, British Columbia
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-gray-300 ">
          <div className="flex justify-center text-2xl mb-5 font-bold">
            Skills
          </div>
          <div className="flex justify-center">
            <div className="flex w-1/4 rounded-2xl justify-center items-center  shadow-custom ">
              <div className=" text-lg  text-gray-800 p-10">
                <ol className="list-disc">
                  {skills.length === 0 ? (
                    <div className="text-xl">No skills selected</div>
                  ) : (
                    skills.map((s) => (
                      <li>
                        <div className="text-xl">{s}</div>{" "}
                      </li>
                    ))
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // updates user info
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

  // edit component ( should probably make a separate file will prob do it in the future)
  const Edit = () => {
    return (
      <div className="self-center w-full ">
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
            <div className="flex items-center flex-col m-3">
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

  // Shows history of booking
  const History = ({ user }) => {
    return (
      <div className="flex justify-center flex-wrap mt-16">
        {user[0].bookings.map((booking) => (
          <div key={user[0].id}>
            {booking.accepted === true && !booking.pending ? (
              <>
                <div className="m-1 w-64 border border-transparent drop-shadow-md rounded-lg p-2 bg-success flex  justify-center flex-col">
                  <ul>
                    <li>
                      <div className="mb-2">
                        {booking.Pros.firstName} {booking.Pros.lastName} is
                        looking forward to seeing you on {"  "}
                        {new Date(booking.timeSlot.startTime)
                          .toUTCString()
                          .replace(/GMT/, " ")}
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
                          "_blank",
                          "location=yes, height=570, width=520, scrollbars=yes, status=yes"
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
                        Your booking has not been accepted yet for {"  "}
                        {new Date(booking.dateFrom)
                          .toDateString()
                          .replace(/GMT/, " ")}{" "}
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
                          "_blank",
                          "location=yes, height=570, width=520, scrollbars=yes, status=yes"
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
            )}{" "}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-28 ml-5">
      <div className="flex flex-row w-auto justify-between">
        <div>
          <ul className="menu bg-base-100 w-56 p-2 rounded-box">
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
