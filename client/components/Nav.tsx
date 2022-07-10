import Link from 'next/link';

const Nav = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">Skee</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <Link href="/about">
            <li>
              <a>Mountains</a>
            </li>
          </Link>
          <li tabIndex={0}>
            <a>
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
      <Link href="/signup">
        <div className="navbar-end">
          <a className="btn">Signup</a>
        </div>
      </Link>
    </div>
  );
};

export default Nav;
