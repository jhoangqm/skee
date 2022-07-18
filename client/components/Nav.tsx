import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// * * * * * * * * * * * * * * * * * * * *
// TODO: Refactor, cleanup, move to components, user cookies in separate function
// * * * * * * * * * * * * * * * * * * * *

const Nav = (props: any) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('');
  const [loginType, setLoginType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const clearForm = useRef(null);

  const fetchUser = async (type: string) => {
    await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(type),
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'No such session') {
        } else {
          setUserType(data.type);
          setUser(data.userSession[0]);
        }
      });
  };

  const onRadioChange = (e: any) => {
    setLoginType(e.target.value);
  };

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        setUser(null);
        setLoggedIn(false);
        setUserType('');
        setLoginType('');
        setError(false);
        setTypeError(false);
      });
  };

  const loginHandler = async e => {
    e.preventDefault();
    const loginData: any = {};
    for (const v of e.target.elements) {
      if (v.checked) loginData[v.name] = v.value;
      loginData[v.name] = v.value;
    }
    loginData.userType = loginType;
    if (loginData.userType === '') {
      setTypeError(true);
      return;
    }

    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'login Error') {
          setError(true);
        } else {
          console.log(data);
          setUser(data);
          setLoggedIn(true);
          setTypeError(false);
          setError(false), e.target.reset();
        }
      });
  };

  useEffect(() => {
    fetchUser('pro');
  }, [loggedIn]);
  useEffect(() => {
    fetchUser('client');
  }, [loggedIn]);

  // console.log(query.id);
  return (
    <div className="navbar bg-secondary hover:bg-secondary rounded-b-lg h-22 fixed top-0 z-50 bg-opacity-75">
      <div className="navbar-start">
        <div className="dropdown">
          {/* // * this is the responsive Nav */}
          {/* //TODO: update responsive nav text size */}
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Link href="/mountains">
              <li className="hover:bg-info hover:rounded-lg">
                <a className="text-2xl">Mountains</a>
              </li>
            </Link>
            {user ? (
              userType === 'client' ? (
                <Link href={`/profile/client/${user?.id}`}>
                  <li className="hover:bg-info hover:rounded-lg">
                    <a className="text-2xl">Profile</a>
                  </li>
                </Link>
              ) : (
                <Link href={`/profile/pro/${user?.id}`}>
                  <li className="hover:bg-info hover:rounded-lg">
                    <a className="text-2xl">Profile</a>
                  </li>
                </Link>
              )
            ) : null}
            <Link href="/mountains/instructors/instructors">
              <li>
                <a className="text-2xl">Instructors</a>
              </li>
            </Link>
          </ul>
        </div>

        {/* //* this is the normal Nav */}

        <Link href="/">
          <a className="btn btn-ghost normal-case text-2xl hover:bg-info hover:rounded-lg">
            Skee 🎿
          </a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <Link href="/mountains">
            <li className="hover:bg-info hover:rounded-lg">
              <a className="text-2xl">Mountains</a>
            </li>
          </Link>
          {user ? (
            userType === 'client' ? (
              <Link href={`/profile/client/${user?.id}`}>
                <li className="hover:bg-info hover:rounded-lg">
                  <a className="text-2xl">Profile</a>
                </li>
              </Link>
            ) : (
              <Link href={`/profile/pro/${user?.id}`}>
                <li className="hover:bg-info hover:rounded-lg">
                  <a className="text-2xl">Profile</a>
                </li>
              </Link>
            )
          ) : null}

          <Link href="mountains/instructors/instructors/">
            <li className="hover:bg-info hover:rounded-lg">
              <a className="text-2xl">Instructors</a>
            </li>
          </Link>
        </ul>
      </div>
      {/* //* signed in property used here */}
      {!user ? (
        <div className="navbar-end text-xl">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary hover:bg-info m-1">
              Login/signup
            </label>
            <div
              tabIndex={0}
              className="dropdown-content card card-compact w-auto p-2 shadow bg-primary bg-opacity-90 text-primary-content "
            >
              <div className="card-body pr-10">
                <form onSubmit={loginHandler} method="post" ref={clearForm}>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Pro</span>
                      <input
                        onChange={onRadioChange}
                        type="radio"
                        value="proChecked"
                        name="userType"
                        className="radio checked:bg-red-500"
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Client</span>
                      <input
                        onChange={onRadioChange}
                        type="radio"
                        value="clientChecked"
                        name="userType"
                        className="radio checked:bg-blue-500"
                      />
                    </label>
                  </div>
                  {typeError ? (
                    <div className="flex justify-center">
                      <div className="text-red-500">
                        Please select a user type
                      </div>
                    </div>
                  ) : null}
                  <div className="form-control my-4">
                    <label className="input-group">
                      <span className="w-full">Email</span>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="info@site.com"
                        className="input input-bordered "
                      />
                    </label>
                  </div>
                  <div className="form-control my-4">
                    <label className="input-group">
                      <span>Password</span>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="password"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  {error ? (
                    <div className="flex justify-center">
                      <div className="text-red-500">
                        email, password or user type incorrect
                      </div>
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="btn bg-secondary hover:bg-success text-xl border-transparent w-full my-2"
                  >
                    Sign in
                  </button>
                </form>
                <Link href="/signup">
                  <a className="btn bg-secondary hover:bg-success text-xl border-transparent">
                    Sign up
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="navbar-end ">
            <p className="text-xl mr-2">{user?.firstName}</p>
            <p
              className="btn bg-transparent hover:bg-success text-xl"
              onClick={logout}
            >
              logout
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
