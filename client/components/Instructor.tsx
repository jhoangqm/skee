import Modal from '../components/Modal';
import { useState, useEffect } from 'react';

import Filter from './Filter';
import { fil } from 'date-fns/locale';
import { props } from 'cypress/types/bluebird';


const Instructor = ({ pros }) => {

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState([]);
  const [filteredPros, setfilteredpros] = useState([]);




  useEffect(() => {
    //  filteredPros = pros.filter(pro => filter.includes(pro.resortId))
    
      const temp = []
      pros.map((pro) => {
        // console.log(filter.includes(pro.resortId))
        if (filter.includes(pro.resortId.toString())) {
          temp.push(pro)
          console.log(pro)
        }
        setfilteredpros(temp)
      
    })
  console.log("filter", filter)
  console.log("filteredPros", filteredPros)
}, [filter])

const filterItem = (item) => {
  if (filter.includes(item)) {
    setFilter(filter.filter(i => i !== item))
    return
  }
  setFilter([...filter, item]);
};



let onclickhandler = (e, id) => {
  const instructor = id
  console.log("instructor", instructor)
  fetch(`/api/pros/${instructor}`)
    .then(res => res.json())
    .then(data => setShowModal(data))

}


return (

  <>
    <Filter pros={pros} setFilter={setFilter} filterItem={filterItem} />
    <div className="modal-instructor">
      {filteredPros.map((p) => (
        <div>
          <div key={p.id} className="flex flex-wrap justify-center  mt-5" onClick={e => onclickhandler(e, p.id)}>
            <div className="card w-96 bg-base-100 shadow-xl m-6" >

              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure><div className="card-body">
                <h2 className="card-title">
                  {p.firstName} {p.lastName}
                </h2>
                <p>{p.bio}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{p.certBody} {p.level}</div>
                  {/* <div className="badge badge-outline"></div> */}
                  <div className="badge badge-outline">{p.resorts.name}</div>
                </div>
              </div>


            </div></div>

        </div>
      ))}{showModal ? <Modal setShowModal={setShowModal} pro={showModal} /> : null}
    </div>
  </>
)
}

export default Instructor