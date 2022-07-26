import UploadAvatar from '../../Upload/UploadAvatar';
import UploadCert from '../../Upload/UploadCertification';
import { MutableRefObject, useState } from 'react';
import { Pros } from '@prisma/client';
interface IEvent {
  target?: any;
  preventDefault: () => void | undefined;
}
interface IEditProps {
  pro: [Pros];
  updateProInfo: (e: IEvent) => void;
  clearForm: MutableRefObject<null>;
}

// Function that brings out the edit profile component ( Should probably make a separate component)
const Edit = ({ pro, updateProInfo, clearForm }: IEditProps) => {
  const [certUpload, setCertUpload] = useState<boolean>();
  const showCert = () => setCertUpload(true);
  const unShowCert = () => setCertUpload(false);

  const submitHandler = (e: IEvent) => {
    updateProInfo(e);
    clearForm;
  };
  return (
    <div className="w-[86%] flex flex-col justify-center mb-5 mt-10">
      <div className="flex items-center flex-col w-1/3 self-center">
        {certUpload ? (
          <>
            <button className="btn btn-primary" onClick={unShowCert}>
              Click to Upload Avatar
            </button>
            <UploadCert proId={pro[0].id} />
          </>
        ) : (
          <>
            <button className="btn btn-primary" onClick={showCert}>
              Click to Upload Certification
            </button>
            <UploadAvatar proId={pro[0].id} />
          </>
        )}
      </div>
      <div className="self-center w-full ">
        <div className="py-8 px-16">
          <form method="patch" onSubmit={submitHandler} ref={clearForm}>
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

export default Edit;
