import useSWR from 'swr';
import { useEffect, useState, useRef } from 'react';
import { Resorts } from '@prisma/client';
import { useRouter } from 'next/router';

const ProSignup = () => {
  const [user, setUser] = useState();
  const [signupError, setSignupError] = useState(false);
  const router = useRouter();
  const clearForm = useRef(null);
  const proSignup = async (e: any) => {
    e.preventDefault();
    const data: any = {};
    for (const v of e.target.elements) {
      data[v.name] = v.value;
    }
    const response = await fetch('/api/pros', {
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

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then(res => res.json());
  const { data, error } = useSWR<Resorts[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <form method="post" onSubmit={proSignup} ref={clearForm}>
      <div className="flex items-center flex-row">
        <label htmlFor="firstName"></label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="First Name"
          className="input input-bordered w-full max-w-xs m-1"
        />
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
          required
          placeholder="Password"
          className="input input-bordered w-full max-w-xs m-1"
        />
      </div>
      <div className="flex items-center flex-col">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phone"
          maxLength={12}
          minLength={10}
          placeholder="(000)000-0000"
          className="input input-bordered w-full max-w-xs m-1"
        />
      </div>
      <div className="flex items-center flex-col">
        <label htmlFor="certBody">Certification Body:</label>
        <input
          type="text"
          name="certBody"
          id="certBody"
          placeholder="Certification Body"
          className="input input-bordered w-full max-w-xs m-1"
        />
      </div>
      <div className="flex items-center flex-col">
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
      <div className="flex items-center flex-col">
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
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-2/3"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Sign up
        </button>
      </div>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      <a
        className="px-7 py-3 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        href="#!"
        role="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="w-3.5 h-3.5 mr-2"
        >
          <path
            fill="currentColor"
            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
          />
        </svg>
        Continue with Facebook
      </a>
      <a
        className="px-7 py-3 text-white bg-sky-400 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
        href="#!"
        role="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-3.5 h-3.5 mr-2"
        >
          <path
            fill="currentColor"
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          />
        </svg>
        Continue with Twitter
      </a>
    </form>
  );
};

export default ProSignup;