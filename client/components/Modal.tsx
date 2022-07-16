import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';

import { useState } from 'react';
import Home from './Calendar';
import BookingCalendar from './Calendar';


const Modal = ({ setShowModal,  pro }) => {

  return (
    <>
       <div>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setShowModal(false)} >✕</label>
            <h3 className="font-bold text-lg">{pro[0].firstName} {pro[0].lastName}</h3>
            <p className="py-4">{pro[0].bio}</p>
            <div>
              <BookingCalendar proId={pro[0].id} isDisabled={true}/>
            </div>
            <div className="modal-action">
              <Link href={`/booking/${pro[0].id}`}>
                <label htmlFor="my-modal-5" className="btn">Book now</label>
              </Link>
            </div>
          </div>
        </div>
      </div>

        
    </>
  )
}

export default Modal



