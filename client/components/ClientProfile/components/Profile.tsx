const Profile = ({ user, skills }) => {
  console.log(user)
  return (
    <div className="flex flex-col  w-[86%]">
      <div className="flex justify-center ">
        <div className="imageBox mt-10">
          <img
            src={user[0].image}
            alt="Profile picture"
            className="shadow-xl rounded-full h-auto align-middle border-none "
            style={{ maxWidth: '150px' }}
          />
        </div>
      </div>
      <div className="text-center mt-12">
        <h3 className="text-4xl font-semibold leading-normal  text-gray-800 mb-2">
          {user[0].firstName} {user[0].lastName}{' '}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{' '}
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
                  skills.map(s => (
                    <li>
                      <div className="text-xl">{s}</div>{' '}
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

export default Profile;
