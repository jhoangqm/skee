import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';

import { useState } from 'react';
import Home from './Calendar';


const fetcher = (url: any) => fetch(url).then(res => res.json());

interface ProProps {
  resorts: Pros[];
}

const Modal = ({ showModal, setShowModal, closeModal , pro }) => {

  // console.log(showModal)
  // const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // console.log(data);


  return (
    <>
       <div>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setShowModal(null)} >✕</label>
            <h3 className="font-bold text-lg">{pro.firstName} {pro.lastName}</h3>
            <p className="py-4">{pro.bio}</p>
            <div>
              <Home />
            </div>
            <div className="modal-action">
              <Link href={`/booking/${pro.id}`}>
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



