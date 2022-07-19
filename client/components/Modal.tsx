import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Pros } from '@prisma/client';
import { prisma } from '../db';

import { useState } from 'react';
import Home from './BookingCalendar';
import BookingCalendar from './BookingCalendar';

// Modal function that shows the availability of the instructor
const Modal = ({ setShowModal, pro }) => {
  return (
    <>
      <div>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal bg-primary bg-opacity-30 ">
          <div className="modal-box w-11/12 max-w-5xl">
            <label
              className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </label>
            <h3 className="font-bold text-2xl text-slate flex justify-center font-bold mb-6">
              {pro[0].firstName} {pro[0].lastName}'s availability:
            </h3>

            <div>
              <BookingCalendar proId={pro[0].id} isDisabled={true} />
            </div>
            <div className="modal-action flex justify-center">
              <Link href={`/booking/${pro[0].id}`}>
                <label htmlFor="my-modal-5" className="btn btn-primary btn-lg">
                  Book now
                </label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
