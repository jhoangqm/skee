import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

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
    <div>Certification</div>
  )
}

export default Certification