import Layout from '../../components/Layout';
import Instructor from '../../components/Description';
import Modal from '../../components/Modal';
import { useState } from 'react';



export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/pros')
  const data = await res.json();

  const paths = data.map(resort => {
    return {
      params: {
        id: resort.resortId.toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/pros/${id}`);
  const data = await res.json();

  return {

    props: { pro: data },

  }
}

const Instructors = ({ pro }) => {
  const [showModal, setShowModal] = useState(null);

  console.log(pro)
  return (
    <Layout>
<div className="flex flex-wrap justify-center mt-5" >
        {pro.map((p) => (         
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
            <Modal showModal={showModal === p.id} setShowModal={setShowModal}  pro={p}/>
          </div>
        ))}
      </div>



    </Layout>

  )
};
export default Instructors;
