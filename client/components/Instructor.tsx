import Modal from '../components/Modal';
import { useState, useEffect } from 'react';





const Instructor = ({ pros, resorts }) => {

  const [showModal, setShowModal] = useState(false);
  // console.log("RESORTS", resorts)
  return (

    <>
    {/* <h1 className="title">Your are currently looking at instructors based out of {resorts[0].name}</h1> */}
      <div className="flex flex-wrap justify-center mt-5" >
        {pros.map((p) => (
          <div key={p.id} className="card w-96 bg-base-100 shadow-xl m-6" onClick={() => setShowModal(p.id)}>

            <figure>
              <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
            </figure><div className="card-body">
              <h2 className="card-title">
                {p.firstName} {p.lastName}
              </h2>
              <p>{p.bio}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{p.certBody}</div>
                <div className="badge badge-outline">{p.level}</div>
              </div>
            </div>
            <Modal showModal={showModal === p.id} setShowModal={setShowModal} pro={p} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Instructor