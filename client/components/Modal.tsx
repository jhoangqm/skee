import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Pros } from '@prisma/client';
import { prisma } from '../db';
import Instructor from './Description';
import { useState } from 'react';


const fetcher = (url: any) => fetch(url).then(res => res.json());

interface ProProps {
  resorts: Pros[];
}

const Modal = ({ showModal, setShowModal }) => {

  console.log(showModal)
  const { data, error } = useSWR<Pros[]>('/api/resorts', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data);


  return (
    <>
      {showModal ? <div>
<input type="checkbox" id="my-modal-5" className="modal-toggle" />
<div className="modal">
   <div className="modal-box w-11/12 max-w-5xl">
     <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
     <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
     <div className="modal-action">
       <label htmlFor="my-modal-5" className="btn">Yay!</label>
     </div>
   </div>
 </div>
 </div>

      
        : null}
    </>
  )
}

export default Modal

{/* <div>
<input type="checkbox" id="my-modal-5" className="modal-toggle" /><div className="modal">
   <div className="modal-box w-11/12 max-w-5xl">
     <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
     <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
     <div className="modal-action">
       <label htmlFor="my-modal-5" className="btn">Yay!</label>
     </div>
   </div>
 </div>
 </div> */}

//  <div><input type="checkbox" id="my-modal-4" className="modal-toggle" />
// <label htmlFor="my-modal-4" className="modal cursor-pointer">
//   <label className="modal-box relative" htmlFor="">
//     <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
//     <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
//   </label>
// </label>
// </div>
//  <div>Im a modal</div>