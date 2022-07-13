import Link from 'next/link';

const Nav = (props: any) => {
  return (
    <div className="navbar bg-base-100 h-24">
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
              <li>
                <a>Mountains</a>
              </li>
            </Link>
            <li tabIndex={0}>
              <a className="justify-between">
                Dev Links
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <Link href="/faq">
                  <li>
                    <a>FAQ</a>
                  </li>
                </Link>
                <Link href="/userprofile">
                  <li>
                    <a>User Profile</a>
                  </li>
                </Link>
                <Link href="/proprofile">
                  <li>
                    <a>Pro Profile</a>
                  </li>
                </Link>
                <Link href="/booking">
                  <li>
                    <a>Booking</a>
                  </li>
                </Link>
              </ul>
            </li>
            <Link href="/instructors">
              <li>
                <a>Instructors</a>
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
          <li tabIndex={0}>
            <a className="hover:bg-info hover:rounded-lg  text-2xl">
              Dev Links
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2">
              <Link href="/faq">
                <li className="bg-info">
                  <a className="text-2xl">FAQ</a>
                </li>
              </Link>
              <Link href="/userprofile">
                <li className="bg-info">
                  <a className="text-2xl">User Profile</a>
                </li>
              </Link>
              <Link href="/proprofile">
                <li className="bg-info">
                  <a className="text-2xl">Pro Profile</a>
                </li>
              </Link>
              <Link href="/booking">
                <li className="bg-info">
                  <a>Booking</a>
                </li>
              </Link>
            </ul>
          </li>
          <Link href="/instructors/1">
            <li className="hover:bg-info hover:rounded-lg">
              <a className="text-2xl">Instructors</a>
            </li>
          </Link>
        </ul>
      </div>
      {/* //* signed in propery used here */}
      {props.signup ? (
        <Link href="/signup">
          <div className="navbar-end text-xl">
            <a className="btn bg-transparent hover:bg-success text-xl">
              Sign in
            </a>
          </div>
        </Link>
      ) : (
        <Link href="/signup">
          <div className="navbar-end ">
            <a className="btn bg-transparent hover:bg-success text-xl">
              logout
            </a>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Nav;
