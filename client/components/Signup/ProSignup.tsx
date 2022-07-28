import useSWR from 'swr';
import { useEffect, useState, useRef } from 'react';
import { Resorts } from '@prisma/client';
import { useRouter } from 'next/router';
import { Skills } from '@prisma/client';

const ProSignup = () => {
  const [skills, setSkills] = useState();
  const [signupError, setSignupError] = useState(false);
  const router = useRouter();
  const clearForm = useRef(null);

  useEffect(() => {
    async function fetchSkills() {
      const res = await fetch('/api/fetchskills');
      const data = await res.json();
      setSkills(data);
    }
    fetchSkills();
  }, []);

  // pro sign up function
  const proSignup = async (e: any) => {
    e.preventDefault();
    const data: any = {};
    for (const v of e.target.elements) {
      data[v.name] = v.value;
    }

    data.type = 'pro';

    // make request to api to create pro
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'signup Error') {
          setSignupError(true);
        } else {
          setSignupError(false), e.target.reset(), router.push('/');
        }
      });
  };

  // fetches resorts DB via API
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then(res => res.json());
  const { data, error } = useSWR<Resorts[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <form method="post" onSubmit={proSignup} ref={clearForm}>
      <div className="flex items-center flex-col my-2">
        <label htmlFor="firstName"></label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="First Name"
          className="input input-bordered w-full max-w-xs m-1"
        />
      </div>
      <div className="flex items-center flex-col my-2">
        <label htmlFor="lastName"></label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          placeholder="Last Name"
          className="input input-bordered w-full max-w-xs m-1"
        />
      </div>
      <div className="flex items-center flex-col my-2">
        <label htmlFor="email"></label>
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
        <label htmlFor="password"></label>
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
      <div className="flex items-center flex-col my-2">
        <label htmlFor="phone"></label>
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
      <div className="flex items-center flex-col my-2">
        <label htmlFor="certBody">Certification Body:</label>
        <select
          id="certBody"
          name="certBody"
          className="select select-bordered w-full max-w-xs m-1 "
        >
          <option value="CSIA">CSIA</option>
          <option value="BASI">BASI</option>
          <option value="APSI">APSI</option>
          <option value="NZSIA">NZSIA</option>
        </select>
      </div>
      <div className="flex items-center flex-col my-2">
        <label htmlFor="resortId">Mountain:</label>
        <select
          id="resort"
          name="resortId"
          className="select select-bordered w-full max-w-xs"
        >
          {data.map((resort: Resorts) => (
            <option value={resort.id} key={resort.id}>
              {resort.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center flex-col my-3">
        <label htmlFor="skillsId">Select a proficiency</label>
        <select
          id="skill"
          name="skill"
          className="select select-bordered w-full max-w-xs"
        >
          {skills?.map((skills: Skills) => (
            <option value={skills.id} key={skills.id}>
              {skills.skill}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center flex-col my-2">
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          name="level"
          className="select select-bordered w-full max-w-xs m-1 mb-3"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="flex justify-center">
        {signupError ? (
          <div className="error-message text-red-600 text-xl">
            Email or Phone number already in use
          </div>
        ) : null}
      </div>
      <div className="flex items-center flex-col">
        <button
          type="submit"
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg mt-5 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-2/3"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default ProSignup;
