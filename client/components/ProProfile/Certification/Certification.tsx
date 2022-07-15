import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// This component fetches the certification from DB
function Certification(props: {proId}) {
  const [certs, setCerts] = useState([])
  
  const { query } = useRouter();
  query.id = props.proId;

  // fetch the cert from the db
  const fetchCert = () => {
  fetch(`/api/uploads/certification/${props.proId}`)
  .then(res => res.json())
  .then(data => setCerts(data))
}

useEffect(() => fetchCert(),[])

console.log('certs data: ', certs)

  return (
    <div>
      <h4>Image from server</h4>
      <img src='https://scontent.fyhu2-1.fna.fbcdn.net/v/t1.18169-9/27544817_1772446526394328_1212537059865333027_n.jpg?stp=cp0_dst-jpg_e15_p240x240_q65&_nc_cat=106&ccb=1-7&_nc_sid=110474&_nc_ohc=Yju2vn4mSccAX9Dahmg&_nc_ht=scontent.fyhu2-1.fna&oh=00_AT8ZRhnULVfkv49BtHIep2Tw0nTamtBhpyCqJ_7N7jmrsA&oe=62F8BB6B'>
        </img>
    </div>
  )
}

export default Certification