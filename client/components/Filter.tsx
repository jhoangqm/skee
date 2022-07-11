import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';
import Toggle from './toggle';


const Filter = () => {


  return (

    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <!-- Page content here --> */}

        <label htmlFor="my-drawer" className="btn btn-primary drawer-button ml-10">Filter your instructor</label>
        <Instructor />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <Toggle />
          <Toggle />

        </ul>
      </div>

    </div>


  )
}

export default Filter