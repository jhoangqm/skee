const Edit = ({ updateUserInfo, clearForm }) => {
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

export default Edit;