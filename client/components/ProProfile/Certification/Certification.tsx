import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// This component fetches the certification from DB
function Certification(props: {proId}) {
  const [certs, setCerts] = useState([])
  
  const { query } = useRouter();
  query.id = props.proId;

  // fetch the cert from the db
  const fetchCert = () => {
  fetch(`/api/uploads/certification`)
  .then(res => res.json())
  .then(data => setCerts(data))
}

useEffect(() => fetchCert() ,[])

const certImage = () => {
  certs.map(c=>c.certImg)
}

console.log('Hello from certImage: ', certImage)

console.log('certs data: ', certs)

  return (
    <div>
      <h4>Image from server</h4>
      <img src={certImage}>
        </img>
    </div>
  )
}

export default Certification